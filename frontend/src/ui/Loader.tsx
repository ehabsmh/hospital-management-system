import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

function Loader({ size }: { size: number }) {
  let [color, setColor] = useState("#ffffff");

  return (
    <div className="sweet-loading">
      <ClipLoader
        color={color}
        loading={true}
        cssOverride={override}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;
