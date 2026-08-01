import React from 'react';

type ErrorBoundaryProps = {
    children: React.ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        // Обновляем стейт, чтобы при следующем рендере показать запасной UI
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Здесь можно прокинуть ошибку в сервис логирования (например, Sentry)
        console.error('Поймана ошибка рендеринга:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
                    <h1 style={{ fontSize: '2rem', color: '#d32f2f' }}>Что-то пошло не так.</h1>
                    <p>Пожалуйста, перезагрузите страницу или попробуйте позже.</p>
                </div>
            );
        }

        return this.props.children;
    }
}