import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';

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
	currentState: ArticleStateType;
	onApply: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isSidebarOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isSidebarOpen]);

	const [formState, setFormState] = useState<ArticleStateType>(currentState);

	const handleChange =
		(field: keyof ArticleStateType) => (value: OptionType) => {
			setFormState((prev) => ({ ...prev, [field]: value }));
		};

	const handleApply = () => {
		onApply(formState);
		setIsSidebarOpen(false);
	};

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
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}
				ref={sidebarRef}>
				<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<div className={styles.fieldGroup}>
						<Select
							selected={formState.fontFamilyOption}
							onChange={handleChange('fontFamilyOption')}
							options={fontFamilyOptions}
							title='Шрифт'
						/>
					</div>

					<div className={styles.fieldGroup}>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleChange('fontSizeOption')}
							title='Размер шрифта'
						/>
					</div>

					<div className={styles.fieldGroup}>
						<Select
							selected={formState.fontColor}
							onChange={handleChange('fontColor')}
							options={fontColors}
							title='Цвет шрифта'
						/>
					</div>

					<div className={styles.separatorWrapper}>
						<Separator />
					</div>

					<div className={styles.fieldGroup}>
						<Select
							selected={formState.backgroundColor}
							onChange={handleChange('backgroundColor')}
							options={backgroundColors}
							title='Цвет фона'
						/>
					</div>

					<div className={styles.fieldGroup}>
						<Select
							selected={formState.contentWidth}
							onChange={handleChange('contentWidth')}
							options={contentWidthArr}
							title='Ширина контента'
						/>
					</div>

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
};
