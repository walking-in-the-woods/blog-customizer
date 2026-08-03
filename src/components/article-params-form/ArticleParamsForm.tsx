import { memo, useState, useRef, useEffect } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	/** Текущее применённое состояние статьи (используется для синхронизации при открытии). */
	currentState: ArticleStateType;
	/** Функция обратного вызова, применяющая переданное состояние к странице. */
	onApply: (newState: ArticleStateType) => void;
};

/**
 * Компонент боковой панели для настройки параметров статьи.
 * Управляет открытием/закрытием сайдбара, локальным состоянием формы (которое
 * применяется только по нажатию кнопки) и синхронизацией с родителем.
 */
export const ArticleParamsForm = memo(function ArticleParamsForm({
	currentState,
	onApply,
}: ArticleParamsFormProps) {
	// 1. Управление видимостью сайдбара
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);

	// 2. Закрытие сайдбара при клике вне области
	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef: sidebarRef,
		onClose: () => setIsSidebarOpen(false),
		onChange: setIsSidebarOpen,
	});

	// 3. Локальное состояние формы (не применяется до нажатия "Применить")
	const [formState, setFormState] = useState<ArticleStateType>(currentState);

	// 4. Синхронизация при открытии: показываем актуальные данные страницы
	useEffect(() => {
		if (isSidebarOpen) {
			setFormState(currentState);
		}
	}, [isSidebarOpen, currentState]);

	// 5. Обработчики изменений полей
	const handleFontFamilyChange = (value: OptionType) =>
		setFormState((prev) => ({ ...prev, fontFamilyOption: value }));
	const handleFontSizeChange = (value: OptionType) =>
		setFormState((prev) => ({ ...prev, fontSizeOption: value }));
	const handleFontColorChange = (value: OptionType) =>
		setFormState((prev) => ({ ...prev, fontColor: value }));
	const handleBgColorChange = (value: OptionType) =>
		setFormState((prev) => ({ ...prev, backgroundColor: value }));
	const handleContentWidthChange = (value: OptionType) =>
		setFormState((prev) => ({ ...prev, contentWidth: value }));

	// 6. Кнопка "Применить"
	const handleApply = () => {
		onApply(formState);
		setIsSidebarOpen(false);
	};

	// 7. Кнопка "Сбросить"
	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
		setIsSidebarOpen(false);
	};

	return (
		<>
			<ArrowButton
				isOpen={isSidebarOpen}
				onClick={() => setIsSidebarOpen((prev) => !prev)}
			/>

			<aside
				className={`${styles.container} ${
					isSidebarOpen ? styles.container_open : ''
				}`}
				ref={sidebarRef}>
				<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
					{/* Заголовок */}
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					{/* Поле Шрифт */}
					<div className={styles.fieldGroup}>
						<Select
							selected={formState.fontFamilyOption}
							onChange={handleFontFamilyChange}
							options={fontFamilyOptions}
							title='Шрифт'
						/>
					</div>

					{/* Поле Размер шрифта */}
					<div className={styles.fieldGroup}>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleFontSizeChange}
							title='Размер шрифта'
						/>
					</div>

					{/* Поле Цвет шрифта */}
					<div className={styles.fieldGroup}>
						<Select
							selected={formState.fontColor}
							onChange={handleFontColorChange}
							options={fontColors}
							title='Цвет шрифта'
						/>
					</div>

					{/* Разделитель */}
					<div className={styles.separatorWrapper}>
						<Separator />
					</div>

					{/* Поле Цвет фона */}
					<div className={styles.fieldGroup}>
						<Select
							selected={formState.backgroundColor}
							onChange={handleBgColorChange}
							options={backgroundColors}
							title='Цвет фона'
						/>
					</div>

					{/* Поле Ширина контента */}
					<div className={styles.fieldGroup}>
						<Select
							selected={formState.contentWidth}
							onChange={handleContentWidthChange}
							options={contentWidthArr}
							title='Ширина контента'
						/>
					</div>

					{/* Кнопки (прижимаются к низу автоматически через margin-top: auto) */}
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleApply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
});
