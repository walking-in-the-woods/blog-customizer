import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	/** Текущее состояние панели (открыта/закрыта). */
	isOpen: boolean;
	/** Колбэк, вызываемый при клике на кнопку. */
	onClick: OnClick;
};

/**
 * Кнопка с изображением стрелки, управляющая открытием и закрытием боковой панели.
 * Изменяет направление стрелки и позиционируется в зависимости от состояния `isOpen`.
 */
export const ArrowButton = ({ isOpen, onClick }: ArrowButtonProps) => {
	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, { [styles.container_open]: isOpen })}
			onClick={onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
			/>
		</div>
	);
};
