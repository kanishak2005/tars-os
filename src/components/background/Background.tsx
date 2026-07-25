import DeepSpace from "./DeepSpace";
import Glow from "./Glow";
import ScanLines from "./ScanLines";
import StarField from "./StarField";
import Vignette from "./Vignette";

export default function Background() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <DeepSpace />
      <StarField />
      <Glow />
      <ScanLines />
      <Vignette />
    </div>
  );
}