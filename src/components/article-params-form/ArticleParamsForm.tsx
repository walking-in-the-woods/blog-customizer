import { useState, useRef } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
    currentState: ArticleStateType;
    onApply: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ currentState, onApply }: ArticleParamsFormProps) => {
    // Состояние для открытия/закрытия панели
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    // Используем готовый хук для закрытия по клику снаружи
    useOutsideClickClose({
        isOpen: isSidebarOpen,
        rootRef: sidebarRef,
        onClose: () => setIsSidebarOpen(false),
        onChange: setIsSidebarOpen,
    });

    return (
        <>
            {/* Навешиваем переключатель на кнопку */}
            <ArrowButton 
                isOpen={isSidebarOpen} 
                onClick={() => setIsSidebarOpen((prev) => !prev)} 
            />
            
            {/* Присваиваем ref и добавляем класс открытия */}
            <aside 
                className={`${styles.container} ${isSidebarOpen ? styles.container_open : ''}`}
                ref={sidebarRef}
            >
                <form className={styles.form}>
                    <div className={styles.bottomContainer}>
                        <Button title='Сбросить' htmlType='reset' type='clear' />
                        <Button title='Применить' htmlType='submit' type='apply' />
                    </div>
                </form>
            </aside>
        </>
    );
};