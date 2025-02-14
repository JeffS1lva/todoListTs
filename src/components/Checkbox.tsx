import { useEffect, useState } from "react";
import styles from "./Checkbox.module.css";

interface CheckboxProps {
  label: string;
  onTaskUpdate: (isChecked: boolean) => void;
  checked: boolean;
}

export function Checkbox({ label, checked = false, onTaskUpdate }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  // Sincroniza o estado do checkbox com o valor de `checked` prop
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  function handleToggle() {
    const newCheckedStatus = !isChecked;
    setIsChecked(newCheckedStatus);

    // Chama o callback para atualizar o estado no componente pai
    onTaskUpdate(newCheckedStatus);
  }

  return (
    <div className={styles.checkboxContainer} onClick={handleToggle}>
      <div className={`${styles.checkbox} ${isChecked ? styles.checked : ""}`}>
        {isChecked && <span className={styles.checkmark}>✔</span>}
      </div>
      {label && (
        <span className={`${styles.label} ${isChecked ? styles.strikethrough : ""}`}>
          {label}
        </span>
      )}
    </div>
  );
}
