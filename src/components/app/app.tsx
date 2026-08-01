import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
    // Создаем глобальное состояние страницы
    const [appState, setAppState] = useState<ArticleStateType>(defaultArticleState);

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
            {/* Передаем текущее состояние и функцию его обновления в форму */}
            <ArticleParamsForm 
                currentState={appState} 
                onApply={setAppState} 
            />
            <Article />
        </main>
    );
};