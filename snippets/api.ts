import express from 'express';
import { exec } from 'child_process';

const app = express();
app.use(express.json());

interface AutomationRequest {
  command: string;
}

app.post('/automate', (req, res) => {
  const { command }: AutomationRequest = req.body;

  if (!command) {
    return res.status(400).json({ error: 'Command is required' });
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr.toString() });
    }
    res.json({ output: stdout.toString() });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});