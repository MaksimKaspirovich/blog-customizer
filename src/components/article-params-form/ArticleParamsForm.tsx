import { useState, FormEvent } from 'react';
import { ArrowButton } from '../../ui/arrow-button/ArrowButton';
import { Button } from '../../ui/button/Button';
import { RadioGroup } from '../../ui/radio-group/RadioGroup';
import { Select } from '../../ui/select/Select';
import { Separator } from '../../ui/separator/Separator';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
} from '../../constants/articleProps';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	onApply: (state: ArticleStateType) => void;
}


export const ArticleParamsForm = ({onApply}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false); //Управляем видимостью боковой панели, изначально false

	const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState); //Храним настройки статьи, по умолчанию defaulArticleState

	const handleToggleSidebar = () => {
		setIsMenuOpen((prevState) => !prevState);
	}; // Отвечает за открытие/закрытие бокового меню

	const handleReset = () => {
		setFormState(defaultArticleState)
	}; //Сбрасывает настройки

	const handleApply = (e: FormEvent) => {
		e.preventDefault();
		onApply(formState);
		setIsMenuOpen(false);
	}; //Применяет настройки, которые выбрал пользователь и закрывает панель

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleToggleSidebar} />
			{isMenuOpen && (
				<div
					className={styles.overlay}
					onClick={() => setIsMenuOpen(false)}>
				</div>
			)}
			<aside className={clsx(styles.container, isMenuOpen && styles.container_open)}
			aria-hidden={!isMenuOpen}>
				<form className={styles.form} onSubmit={handleApply} onReset={handleReset}>
					<Text as="h2" size={31} weight={800} uppercase align='left'>Задайте параметры</Text>
					<div className={styles.formGroup}>
						<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(option) => 
							setFormState({
								...formState,
								fontFamilyOption: option,
							})
						} />
					</div>
					<div className={styles.formGroup}>
						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={(option) => {
								setFormState({
									...formState,
									fontSizeOption: option,
								})
							}} />
					</div>
					<div className={styles.formGroup}>
						<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option) => 
							setFormState({
								...formState,
								fontColor: option,
							})
						} />
					</div>
					<Separator />
					<div className={styles.formGroup}>
						<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option) => 
							setFormState({
								...formState,
								backgroundColor: option,
							})
						} />
					</div>
					<div className={styles.formGroup}>
						<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option) => 
							setFormState({
								...formState,
								contentWidth: option,
							})
						} />
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
						/>
					</div>
				</form>
			</aside>
		</>
	)
}