import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './../../constants/articleProps';

import styles from './app.module.scss';

/**
 * Корневой компонент приложения.
 * Управляет глобальным состоянием настроек статьи (appState) и передаёт его
 * в виде CSS-переменных в DOM-дерево.
 * Служит "источником истины" для применённых стилей страницы.
 */
export const App = () => {
	const [appState, setAppState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appState.fontFamilyOption.value,
					'--font-size': appState.fontSizeOption.value,
					'--font-color': appState.fontColor.value,
					'--container-width': appState.contentWidth.value,
					'--bg-color': appState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm currentState={appState} onApply={setAppState} />
			<Article />
		</main>
	);
};
