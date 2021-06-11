import { FC, useState } from 'react';
import styles from './styles.module.scss';
import { ChevronDown } from '../../assets/images';

type CustomSelectInputProps = {
  label?: string,
  options: object,
  currentOption: string | number | boolean;
  setCurrentOption: (option: any) => void,
}

const CustomSelect: FC<CustomSelectInputProps> = (props) => {

  const { label, options, currentOption, setCurrentOption } = props;

  const toggleIconStyles: any = {
    initial: styles.toggleIcon,
    active: `${styles.toggleIcon} ${styles.active}`
  }

  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);
  
  const invertBoolean = (state: boolean): boolean => !state;

  const onClickToggle = () => setIsToggleOpen(invertBoolean);

  const selectOption = (option: any): void => {
    setCurrentOption(option);
    setIsToggleOpen(invertBoolean);
  };
  
  return (
    <div className={styles.CustomSelectInput}>
      {!!label && <span className={styles.label}>{`${label}:`}</span>}

      <div className={styles.selectWrapper}>
        <div className={styles.toggleButton}
          onClick={onClickToggle}
        >
          <span>{currentOption}</span>
          <ChevronDown className={toggleIconStyles[isToggleOpen ? 'active' : 'initial']}/>
        </div>

        {isToggleOpen && (
          <ul className={styles.optionsWrapper}>
          {!!Object.keys(options).length && Object.entries(options)
            .map(([key, value]: any) => (
              <li className={styles.filterOption}
                key={value.toString()}
                onClick={() => selectOption(value)}
              >
                {key}
              </li>
          ))}
          </ul>
        )}
      </div>

    </div>
    
  )
}

export default CustomSelect;