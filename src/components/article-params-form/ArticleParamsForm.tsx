import { memo, useState, useRef } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
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
    currentState: ArticleStateType;
    onApply: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = memo(({ currentState, onApply }: ArticleParamsFormProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useOutsideClickClose({
        isOpen: isSidebarOpen,
        rootRef: sidebarRef,
        onClose: () => setIsSidebarOpen(false),
        onChange: setIsSidebarOpen,
    });

    const [formState, setFormState] = useState<ArticleStateType>(currentState);

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
                className={`${styles.container} ${isSidebarOpen ? styles.container_open : ''}`}
                ref={sidebarRef}
            >
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.title}>
                        <Text size={31} weight={800} uppercase>
                            Задайте параметры
                        </Text>
                    </div>

                    <Select
                        selected={formState.fontFamilyOption}
                        onChange={handleFontFamilyChange}
                        options={fontFamilyOptions}
                        title="Шрифт"
                    />
                    <RadioGroup
                        name="fontSize"
                        options={fontSizeOptions}
                        selected={formState.fontSizeOption}
                        onChange={handleFontSizeChange}
                        title="Размер шрифта"
                    />
                    <Select
                        selected={formState.fontColor}
                        onChange={handleFontColorChange}
                        options={fontColors}
                        title="Цвет шрифта"
                    />
                    <Select
                        selected={formState.backgroundColor}
                        onChange={handleBgColorChange}
                        options={backgroundColors}
                        title="Цвет фона"
                    />
                    <Select
                        selected={formState.contentWidth}
                        onChange={handleContentWidthChange}
                        options={contentWidthArr}
                        title="Ширина контента"
                    />

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