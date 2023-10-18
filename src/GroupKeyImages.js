import Circle from './assets/circle.svg'
import Cancelled from './assets/cross-circle.svg'
import DotCircle from './assets/dotted-circle.svg'
import HighP from './assets/high-p.svg'
import LowP from './assets/low-p.svg'
import MedP from './assets/med-p.svg'
import OkCircle from './assets/ok-circle.svg'
import Urgent from './assets/urgent.svg'
import NoP from './assets/line-dashed.svg'
import ProgressCircle from './assets/in-progress.svg'

const groupKeyImages = {
    "Todo": Circle,
    "Backlog": DotCircle,
    "In progress": ProgressCircle,
    "Done": OkCircle,
    "Cancelled": Cancelled,
    "No priority": NoP,
    "Urgent": Urgent,
    "High": HighP,
    "Medium": MedP,
    "Low": LowP,
};

export default groupKeyImages;