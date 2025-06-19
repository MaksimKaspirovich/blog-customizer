import { useState, FormEvent } from 'react';
import { ArrowButton } from '../../ui/arrow-button/ArrowButton';
import { Button } from '../../ui/button/Button';
import { RadioGroup } from '../../ui/radio-group/RadioGroup';
import { Select } from '../../ui/select/Select';
import { Separator } from '../../ui/separator/Separator';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';


export const ArticleParamsForm = ({onApply}: {
	onApply: (state: ArticleStateType) => void;
}) => {
	const [isOpen, setIsOpen] = useState(false); //Управляем видимостью боковой панели, изначально false

	const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState); //Храним настройки статьи, по умолчанию defaulArticleState

	const handleToggleSidebar = () => {
		setIsOpen((prevState) => !prevState);
	}; // Отвечает за открытие/закрытие бокового меню

	const handleReset = () => {
		setFormState(defaultArticleState)
	}; //Сбрасывает настройки

	const handleApply = (e: FormEvent) => {
		e.preventDefault();
		onApply(formState);
		setIsOpen(false);
	}; //Применяет настройки, которые выбрал пользователь и закрывает панель

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggleSidebar} />
			{isOpen && (
				<div
					className={styles.overlay}
					onClick={() => setIsOpen(false)}>
				</div>
			)}
			<aside className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
				<form className={styles.form} onSubmit={handleApply}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<div className={styles.formGroup}>
						<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(option) => 
							setFormState({
								fontFamilyOption: option,
								fontColor: formState.fontColor,
								backgroundColor: formState.backgroundColor,
								contentWidth: formState.contentWidth,
								fontSizeOption: formState.fontSizeOption,
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
									fontFamilyOption: formState.fontFamilyOption,
									fontColor: formState.fontColor,
									backgroundColor: formState.backgroundColor,
									contentWidth: formState.contentWidth,
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
								fontFamilyOption: formState.fontFamilyOption,
								fontColor: option,
								backgroundColor: formState.backgroundColor,
								contentWidth: formState.contentWidth,
								fontSizeOption: formState.fontSizeOption,
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
								fontFamilyOption: formState.backgroundColor,
								fontColor: formState.fontColor,
								backgroundColor: option,
								contentWidth: formState.contentWidth,
								fontSizeOption: formState.fontSizeOption,
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
								fontFamilyOption: formState.fontFamilyOption,
								fontColor: formState.fontColor,
								backgroundColor: formState.backgroundColor,
								contentWidth: option,
								fontSizeOption: formState.fontSizeOption,
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