const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

const services = [
  { name: 'gateway', port: 3000 },
  { name: 'auth-service', port: 3001 },
  { name: 'cart-service', port: 3002 },
  { name: 'order-service', port: 3003 },
  { name: 'payment-service', port: 3004 },
  { name: 'inventory-service', port: 3005 },
  { name: 'notification-service', port: 3006 }
];

function waitForServer(port, timeout = 10000) {
  return new Promise((resolve) => {
    const start = Date.now();

    function check() {
      const req = http.get(`http://127.0.0.1:${port}/health`, (res) => {
        res.resume();
        resolve({ ok: true, status: res.statusCode });
      });

      req.on('error', () => {
        if (Date.now() - start > timeout) {
          resolve({ ok: false, status: null });
          return;
        }
        setTimeout(check, 500);
      });
    }

    check();
  });
}

function startService(service) {
  return new Promise((resolve) => {
    const servicePath = path.join(__dirname, '..', 'services', service.name);
    const child = spawn('node', ['src/index.js'], {
      cwd: servicePath,
      env: {
        ...process.env,
        PORT: String(service.port)
      },
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let output = '';
    child.stdout.on('data', (data) => {
      output += data.toString();
    });
    child.stderr.on('data', (data) => {
      output += data.toString();
    });

    const timer = setTimeout(() => {
      child.kill();
      resolve({ service: service.name, ok: false, reason: 'startup timeout', output });
    }, 5000);

    child.on('error', () => {
      clearTimeout(timer);
      resolve({ service: service.name, ok: false, reason: 'spawn error', output });
    });

    child.on('spawn', async () => {
      const result = await waitForServer(service.port, 4000);
      clearTimeout(timer);
      if (result.ok) {
        child.kill();
        resolve({ service: service.name, ok: true, reason: 'healthy', output });
      } else {
        child.kill();
        resolve({ service: service.name, ok: false, reason: 'health check failed', output });
      }
    });
  });
}

async function main() {
  console.log('Starting verification for all services...');

  for (const service of services) {
    const result = await startService(service);
    console.log(`${result.service}: ${result.ok ? 'UP' : 'DOWN'} (${result.reason})`);
    if (!result.ok && result.output) {
      console.log(result.output.trim());
    }
  }
}

main().catch((err) => {
  console.error('Verification failed with error:', err);
  process.exit(1);
});
