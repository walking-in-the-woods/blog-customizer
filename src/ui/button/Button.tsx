import { Text } from 'src/ui/text';
import styles from './Button.module.scss';
import { clsx } from 'clsx';

type ButtonProps = {
	/** Текст, отображаемый на кнопке. */
	title: string;
	/** Опциональный колбэк клика (если не используется htmlType submit/reset). */
	onClick?: () => void;
	/** HTML-тип кнопки: 'button', 'submit' или 'reset'. */
	htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	/** Стилизация кнопки: 'apply' (желтая) или 'clear' (белая). */
	type: 'apply' | 'clear';
};

/**
 * Переиспользуемый компонент кнопки.
 * Предоставляет два предустановленных стиля: "Применить" (желтый фон) и "Сбросить" (белый фон).
 */
export const Button = ({ title, onClick, htmlType, type }: ButtonProps) => {
	return (
		<button
			className={clsx(
				styles.button,
				{ [styles.button_apply]: type === 'apply' },
				{ [styles.button_clear]: type === 'clear' }
			)}
			type={htmlType}
			onClick={onClick}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
