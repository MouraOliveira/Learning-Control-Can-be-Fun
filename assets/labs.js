/* ------------------------------------------------------------------
   LAB REGISTRY  (the only file you edit to add a new laboratory)
   ------------------------------------------------------------------
   1. Put the lab's HTML file in /labs
   2. Add one entry below. The homepage cards, filters, search and the
      prev/next navigation inside each lab are all generated from it.
   3. Add these two lines before </body> in the lab file:
        <script src="../assets/labs.js"></script>
        <script src="../assets/lab-nav.js"></script>

   level   : 'Introductory' | 'Intermediate' | 'Advanced'
   preview : thumbnail style: 'step2' | 'poles' | 'ramp' | 'pid' | 'pidx' | 'ff'
------------------------------------------------------------------ */
window.LABS = [
  {
    id: 'step-response',
    title: 'Step Response Lab',
    file: 'labs/step-response-lab.html',
    level: 'Introductory',
    preview: 'step2',
    tags: ['Time response', 'Second-order systems'],
    summary: 'Drag the damping ratio and natural frequency of a second-order system and watch overshoot, rise time and settling time react.',
    objectives: [
      'Relate ζ and ωn to the transient specifications',
      'Compare the IAE, ISE and ITAE performance indices',
      'Connect damping to resonance, bandwidth and phase margin'
    ]
  },
  {
    id: 'stability-dc-motor',
    title: 'Stability of a DC-Motor Position Loop',
    file: 'labs/stability-dc-motor.html',
    level: 'Intermediate',
    preview: 'poles',
    tags: ['Stability', 'Routh–Hurwitz', 'Root locus'],
    summary: 'Raise the loop gain K and follow the closed-loop poles across the s-plane until the motor angle turns from steady to unstable.',
    objectives: [
      'Locate closed-loop poles as K grows',
      'Use the Routh array to find the limit gain',
      'Tell stable, critically stable and unstable responses apart'
    ]
  },
  {
    id: 'antenna-system-type',
    title: 'Antenna Tracking and System Type',
    file: 'labs/antenna-system-type.html',
    level: 'Intermediate',
    preview: 'ramp',
    tags: ['Steady-state error', 'System type'],
    summary: 'A motor-driven dish chases a target that steps, then ramps, then accelerates. See which controllers keep up and which fall behind.',
    objectives: [
      'Compare tracking of step, ramp and parabolic inputs',
      'See how system type and integral action set the steady-state error',
      'Check simulated errors against the theoretical values'
    ]
  },
  {
    id: 'pid-control-lab',
    title: 'PID Control Lab',
    file: 'labs/pid-control-lab.html',
    level: 'Introductory',
    preview: 'pid',
    tags: ['PID', 'Disturbance rejection'],
    summary: 'Tune P, I and D on a simulated process with a setpoint step and a surprise load, and see each term’s share of the control effort.',
    objectives: [
      'See what proportional, integral and derivative action each do',
      'Observe the effect of noise, dead time and actuator limits',
      'Meet integrator windup and its remedy'
    ]
  },
  {
    id: 'pid-explorer',
    title: 'PID Control Explorer',
    file: 'labs/pid-explorer.html',
    level: 'Advanced',
    preview: 'pidx',
    tags: ['PID', 'Anti-windup', 'Tuning'],
    summary: 'A full workbench: pick the process, filter the derivative, limit the actuator, hold traces to compare tunings, and follow guided experiments.',
    objectives: [
      'Run guided experiments on P, I and D action',
      'Compare clamping and back-calculation anti-windup',
      'Hold traces to compare tunings side by side'
    ]
  },
  {
    id: 'feedforward-control',
    title: 'Feedforward Control Lab',
    file: 'labs/feedforward-control.html',
    level: 'Advanced',
    preview: 'ff',
    tags: ['Feedforward', 'Disturbance rejection', 'Dead time'],
    summary: 'A measurable disturbance hits the process. Compare feedforward alone, feedback alone and the two combined, and see what limits perfect cancellation.',
    objectives: [
      'Derive the ideal feedforward compensator from the process and disturbance models',
      'See why dead time and actuator limits restrict what feedforward can cancel',
      'Compare static and dynamic feedforward, with PI feedback cleaning up the rest'
    ]
  }
];
