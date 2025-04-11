import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

function Loader({ size, color = "#ffffff" }: { size: number; color?: string }) {
  return (
    <ClipLoader
      color={color}
      loading={true}
      cssOverride={override}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export default Loader;
