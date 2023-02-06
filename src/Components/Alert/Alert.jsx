import styles from "./Alert.module.css";

export default function Alert({ text, isAccept, isCanceled }) {

  return (
    <div
      className={text && isAccept ? styles.container : null}
      style={!text && !isAccept ? { display: "none" } : null}
    >
      <div className={styles.window}>
        <span>{text}</span>
        <div className={styles.btnContainer}>
          <button className="btn btn-success" onClick={() => {isAccept(); isCanceled();}}>
            Aceptar
          </button>
          <button className="btn btn-danger" onClick={isCanceled}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}