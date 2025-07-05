import { useEffect } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

export function GrapeEditor() {
  useEffect(() => {
    grapesjs.init({
      container: "#gjs",
      height: "600px",
      width: "auto",
      storageManager: { autoload: false },
    });
  }, []);

  return <div id="gjs"></div>;
}
