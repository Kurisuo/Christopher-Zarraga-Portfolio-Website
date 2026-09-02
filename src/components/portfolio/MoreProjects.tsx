import { useState } from "react";
import { Reveal } from "./Reveal";
import { BuildLogCard } from "./BuildLogCard";

const projects = [
  {
    tag: "Research",
    name: "AIEA Lab",
    blurb: "Autonomous vehicles research with reinforcement learning.",
    detail: "SAC agents, Gymnasium CarRacing, CARLA, and Kubernetes GPU workloads.",
    code: <><span className="text-muted-foreground"># autonomous driving research</span>{"\n"}<span className="text-foreground">agent</span> = <span className="text-muted-foreground">SAC</span>(policy=<span className="text-muted-foreground">&quot;MlpPolicy&quot;</span>){"\n"}<span className="text-foreground">agent</span>.<span className="text-muted-foreground">learn</span>(total_timesteps=<span className="text-foreground">250_000</span>)</>,
  },
  {
    tag: "Tech4Good",
    name: "Tech4Good Lab",
    blurb: "A full-stack learning curriculum app built for social impact.",
    detail: "Milestone components and batch data pipelines for multi-record transactions.",
    code: <><span className="text-muted-foreground">// ship learning milestones</span>{"\n"}<span className="text-foreground">await</span> <span className="text-muted-foreground">batchWrite</span>(milestones, {"{"} atomic: <span className="text-foreground">true</span> {