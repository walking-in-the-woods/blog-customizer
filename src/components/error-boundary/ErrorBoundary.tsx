import * as React from 'react';

type ErrorBoundaryProps = {
	/** Дочерние компоненты, которые будут обёрнуты в обработчик ошибок. */
	children: React.ReactNode;
};

type ErrorBoundaryState = {
	hasError: boolean;
};

/**
 * Компонент-граница ошибки (Error Boundary).
 * Перехватывает ошибки JavaScript в дочернем дереве компонентов, логирует их
 * и отображает запасной UI вместо упавшего компонента.
 *
 * Примечание: В React функциональные компоненты не имеют эквивалента для
 * `getDerivedStateFromError` и `componentDidCatch`, поэтому используется класс.
 */
export class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(): ErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('Поймана ошибка рендеринга:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div
					style={{
						padding: '2rem',
						textAlign: 'center',
						fontFamily: 'sans-serif',
					}}>
					<h1 style={{ fontSize: '2rem', color: '#d32f2f' }}>
						Что-то пошло не так.
					</h1>
					<p>Пожалуйста, перезагрузите страницу или попробуйте позже.</p>
				</div>
			);
		}

		return this.props.children;
	}
}
