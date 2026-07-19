import styles from "./FramerInstructions.module.css";

export default function FramerInstructions() {
  return (
    <details className={styles.details}>
      <summary className={styles.summary}>How to add to Framer</summary>
      <ol className={styles.list}>
        <li>
          Tune the fluid in the configurator, then click{" "}
          <strong>Copy for Framer</strong>.
        </li>
        <li>
          In Framer, open <strong>Assets → Code</strong> and create a new Code
          Component.
        </li>
        <li>Paste the copied code into the component file.</li>
        <li>
          When Framer prompts for dependencies, install{" "}
          <code>webgl-fluid-enhanced</code>.
        </li>
        <li>
          Drag the component onto your canvas and set its width and height to
          fill the frame or section you want.
        </li>
        <li>
          Preview the site and move your cursor over the component to see the
          hover swirl.
        </li>
      </ol>
    </details>
  );
}
