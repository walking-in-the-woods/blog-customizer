import { useEffect } from 'react';

type UseOutsideClickClose = {
	/** Флаг, открыт ли текущий элемент. */
	isOpen: boolean;
	/** Функция для обновления состояния открытости. */
	onChange: (newValue: boolean) => void;
	/** Опциональный колбэк, вызываемый при закрытии. */
	onClose?: () => void;
	/** Ссылка на корневой DOM-элемент, клики внутри которого игнорируются. */
	rootRef: React.RefObject<HTMLDivElement>;
};

/**
 * Кастомный хук для закрытия выпадающих списков/сайдбаров при клике вне их области.
 * Автоматически устанавливает и удаляет обработчик события `mousedown` на `window`,
 * предотвращая утечки памяти благодаря функции очистки в `useEffect`.
 */
export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.();
				onChange?.(false);
			}
		};

		if (!isOpen) {
			return;
		}

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [onClose, onChange, isOpen]);
};
