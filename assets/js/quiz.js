var counter = 1 // счётчик блока вопросов
var ConvertStepInIndex = (step, i) => { return (4 * (step - 1) + i) }
var ConvertIndexInStep = (i) => { var step = 1; while (i > 4) { step++; i -= 4 } return [step, i] }
const list_quastion = {
	1: {
		quastion: "Какая у тебя мечта?",
		1: {
			quastion: 'Сочинять и исполнять свою музыку',
			img: "assets/img/qui__answers__photo_1.png",
			storage: ''
		},
		2: {
			quastion: 'Выступать на сцене',
			img: "assets/img/qui__answers__photo_2.png",
			storage: ''
		},
		3: {
			quastion: 'Собрать свою группу',
			img: "assets/img/qui__answers__photo_3.png",
			storage: ''
		},
		4: {
			quastion: 'Играть и петь песни любимых <br> исполнителей',
			img: "assets/img/qui__answers__photo_4.png",
			storage: ''
		}
	},
	2: {
		quastion: "Какую задачу ты хочешь решить музыкой?",
		1: {
			quastion: 'Стать увереннее ',
			img: "assets/img/qui__answers__photo_5.png",
			storage: ''
		},
		2: {
			quastion: 'Отдохнуть и переключиться ',
			img: "assets/img/qui__answers__photo_6.png",
			storage: ''
		},
		3: {
			quastion: 'Найти новое хобби',
			img: "assets/img/qui__answers__photo_7.png",
			storage: ''
		},
		4: {
			quastion: 'Освоить новый навык, чтобы развиваться',
			img: "assets/img/qui__answers__photo_8.png",
			storage: ''
		}
	},
	3: {
		quastion: "Что для тебя музыка?",
		1: {
			quastion: 'Сцена, свет софитов и зрители в зале ',
			img: "assets/img/qui__answers__photo_9.png",
			storage: ''
		},
		2: {
			quastion: 'Полное отключение от реального мира',
			img: "assets/img/qui__answers__photo_10.png",
			storage: ''
		},
		3: {
			quastion: 'Выплеск эмоций ',
			img: "assets/img/qui__answers__photo_11.png",
			storage: ''
		},
		4: {
			quastion: 'Способ донести свои мысли и настроение до людей',
			img: "assets/img/qui__answers__photo_12.png",
			storage: ''
		}
	},
	4: {
		quastion: "Какая музыка тебе нравится?",
		1: {
			quastion: 'Что-то динамичное и активное ',
			img: "assets/img/qui__answers__photo_13.png",
			storage: ''
		},
		2: {
			quastion: 'Чем тяжелее, тем лучше',
			img: "assets/img/qui__answers__photo_14.png",
			storage: ''
		},
		3: {
			quastion: 'Что-то более медленное и спокойное ',
			img: "assets/img/qui__answers__photo_15.png",
			storage: ''
		},
		4: {
			quastion: 'Я за любой движ!',
			img: "assets/img/qui__answers__photo_16.png",
			storage: ''
		}
	},
	5: {
		quastion: "Уже выбрал, какую песню будешь играть первой?",
		1: {
			quastion: 'Конечно!',
			img: "assets/img/qui__answers__photo_17.png",
			storage: ''
		}
	}
}
//===== main =====/
$(function () {
	changeQuastion(counter);

	$('.quiz__input').click(function () {
		setStylePhoto($(this))

	})

	$('.quiz__prev__button').click(function (e) {
		e.preventDefault();
		if (counter === 6) {

			$('.quiz__medium_title').html('и мы поможем выбрать направление обучения')
			$('.quiz__big_title').html('Ответь на 5<br class="quiz__br_mobile"> вопросов')
			$('.quiz__answers__flex').show()
			$('.quiz__surprise_final').hide()
			$('.quiz__bottom__big_star').removeClass('active')
			$('.quiz__quastion').show()
			$('.quiz__status_bar').show()
			$('.quiz__promo__mobile, .quiz__promo__desc, .quiz__promo__table').addClass('hide_ZK')
			$('.quiz__counter').show()
			$('.quiz__form__feedback').hide()
			$('.quiz__next__button ').show()
			$('.quiz__medium_title').removeClass('active')
			$('.quiz__surprise__target, .quiz__surprise__target__table, .quiz__surprise__target__mobile').removeClass('hide_ZK')
		}
		--counter
		if (counter === 1) $(this).hide()
		if (counter === 4) $('.quiz__next__button').text('Следующий вопрос').show()

		changeQuastion(counter);
	})

	$('.quiz__next__button').click(function (e) {
		e.preventDefault()
		if (counter === 6) return;
		++counter
		if (counter === 5) $(this).text('Узнать направление')
		if (counter === 2) $('.quiz__prev__button').show()
		if (counter < 5) changeQuastion(counter)
		else if (counter === 5) changeLastQuastion(counter)
		else if (counter === 6) showFeedback()
	})

})

// ===== При включенном чекбоксе дает стиль родителю =====
function setStylePhoto(checkbox) {
	var parent = checkbox.parent().parent()
	parent.toggleClass('active')
	setStorageQuastion(checkbox)
}
// ====== Сохраняет состояние чекбокса в переменную
function setStorageQuastion(input) {
	var str = input.attr('id'),
		index = str.split('_').at(-1),
		id_quastion = ConvertIndexInStep(index),
		status = input.prop('checked') ? '1' : ''
	list_quastion[id_quastion[0]][id_quastion[1]].storage = status

}

// ====== Динамическое переключение вопросов по кнопке====
function changeQuastion(step) {
	var parent = $('.class_quiz__answers__parent'),
		i = 1

	if (step === 4) $('.quiz__answers__card:not(:first-child)').show()
	parent.find('.quiz__quastion').html(list_quastion[step].quastion)
	parent.find('.quiz__counter').text(`№${step}`)
	parent.find('.quiz__status_bar__target').css("width", `${step * 20}%`,)
	$('.quiz__answers__card').each(function () {
		var statCheck = list_quastion[step][i].storage
		$(this).hide().fadeIn(600)
		$(this).find('.quiz__answers__check__text').html(list_quastion[step][i].quastion)
		$(this).find('.quiz__answers__photo').attr('src', list_quastion[step][i].img)
		$(this).find('.quiz__input').attr('id', `quiz__answers__check_${(ConvertStepInIndex(step, i))}`)
		$(this).attr('for', `quiz__answers__check_${(ConvertStepInIndex(step, i))}`)
		if (statCheck) {
			$(this).find('.quiz__input').prop('checked', true)
			$(this).addClass('active')
		}
		else {
			$(this).find('.quiz__input').prop('checked', false)
			$(this).removeClass('active')
		}
		// $(this).attr('for',`quiz__answers__check_${(index_card(step, i))}`)
		++i
	})
}

// ==== Изменение последнего вопроса, уберает 2.3.4 карточку вопроса. ===
function changeLastQuastion(step) {
	var parent = $('.class_quiz__answers__parent'),
		i = 1,
		max_quastion = Object.keys(list_quastion).length;
	
	var first_card = $('.quiz__answers__card').eq(0);
	$('.quiz__answers__card').hide().fadeIn(600)
	var statCheck = list_quastion[max_quastion][1].storage
	first_card.find('.quiz__input').attr('id', `quiz__answers__check_${(ConvertStepInIndex(max_quastion, 1))}`)
	first_card.attr('for', `quiz__answers__check_${(ConvertStepInIndex(max_quastion, 1))}`)
	if (statCheck) {
		first_card.find('.quiz__input').prop('checked', true)
		first_card.addClass('active')
	}
	else {
		first_card.find('.quiz__input').prop('checked', false)
		first_card.removeClass('active')
	}
	$('.quiz__answers__card:not(:first-child)').hide()
	parent.find('.quiz__quastion').html(list_quastion[step].quastion)
	parent.find('.quiz__counter').text(`№${step}`)
	parent.find('.quiz__status_bar__target').css("width", `${step * 20}%`,)

	first_card.find('.quiz__answers__check__text').html(list_quastion[step][i].quastion)
	first_card.find('.quiz__answers__photo').attr('src', list_quastion[step][i].img)
}

function showFeedback() {
	$('.quiz__medium_title').addClass('active')
	$('.quiz__medium_title').html('<img src="assets/img/quiz__surprise_span.svg"><p>и получить <span>скидку</span> на абонемент до <span>25%</span></p>');
	$('.quiz__surprise__target, .quiz__surprise__target__table, .quiz__surprise__target__mobile').addClass('hide_ZK')
	$('.quiz__big_title').text('Оставь заявку, чтобы узнать результат')
	$('.quiz__promo__mobile, .quiz__promo__desc, .quiz__promo__table').removeClass('hide_ZK')
	$('.quiz__bottom__big_star').addClass('active')
	$('.quiz__answers__flex').hide()
	$('.quiz__quastion').hide()
	$('.quiz__status_bar').hide()
	$('.quiz__surprise_final').show()
	$('.quiz__counter').hide()
	$('.quiz__form__feedback').show()
	$('.quiz__next__button ').hide()
	if ($(window).width() < 992) {
		$('.quiz__feedback__btn ').text('отправить')
	}
	else {
		$('.quiz__feedback__btn ').text('оставить заявку')
	}
}
