import { v4 } from "uuid"

const TASKS = [
  {
    id: v4(),
    title: "Estudar NextJs",
    description: "Estudar next com o professor Felipe Rocha",
    time: "morning",
    status: "done",
  },
  {
    id: v4(),
    title: "Treinar",
    description: "Treinar costas e peito",
    time: "morning",
    status: "not_started",
  },
  {
    id: v4(),
    title: "Brincar com Théo",
    description: "Brincar com meu filho amado Théo Braga",
    time: "afternoon",
    status: "not_started",
  },
  {
    id: v4(),
    title: "Estudar sobre IA",
    description: "Estudar um pouco sobre Inteligencia artificial",
    time: "evening",
    status: "not_started",
  },
  {
    id: v4(),
    title: "Fazer projeto Orbix",
    description: "Codar um pouco no meu projeto Orbix Studio",
    time: "morning",
    status: "in_progress",
  },
]

export default TASKS
