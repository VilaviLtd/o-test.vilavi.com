<?php
    // регион по умолчанию
	$defaultRegion = "ru";
	// допустимые регионы
    $supportedRegions = array("ru", "kz", "kg");
	// время жизни куки
	$cookieExprireTime = time() + 3600 * 24 * 30; // 30 суток
	$cookieRegion = "";
	// регион страницы
	$region = $defaultRegion;
	if(isset($_COOKIE["region"])) {
		// есть кука
		$cookieRegion = strtolower($_COOKIE["region"]);
		if(in_array($cookieRegion, $supportedRegions)) {
			// продлеваем время жизни
			setcookie("region", $cookieRegion, $cookieExprireTime, "/");
			$region = $cookieRegion;
		} else {
			// неизвестный регион, удаление куки
			setcookie("region", "", time() - 3600, "/");
			$cookieRegion = "";
		}
	}

	if(isset($_GET["region"])) {
		// в запросе присутствует регион
		$queryRegion = strtolower(trim($_GET["region"]));
		if(in_array($queryRegion, $supportedRegions)) {
			$region = $queryRegion;
			if($cookieRegion != $queryRegion) {
				// регион из куки не совпадает с регионом в запросе, переустанавливаеам куку
				setcookie("region", $queryRegion, $cookieExprireTime, "/");
			}
		} else {
			// параметре запроса какой-то неизвестный регион, перенаправляем на главную страницу
			header("Location: https://o-test.vilavi.com");
			die();
		}
	} else {
		// в запросе нет региона
		if($cookieRegion != "") {
			// но регион есть в куке и он является допустимым, перенаправляем на запрос с регионом
			if($cookieRegion != $defaultRegion) {
				header("Location: https://o-test.vilavi.com?region=".$cookieRegion);
			}
			die();
		}
	}
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="main_new.css?13" />
        <title>O! Test - анализ в домашних условиях</title>
        <meta name="description" content="Анализы в домашних условиях на проверку состояния организма"/>
    </head>
    <body>
<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
 
    ym(95360051, "init", {
         clickmap:true,
         trackLinks:true,
         accurateTrackBounce:true,
         webvisor:true,
         trackHash:true
    });
 </script>
 <noscript><div><img src="https://mc.yandex.ru/watch/95360051" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
 <!-- /Yandex.Metrika counter -->
 <div class="page-container" id="pageContainer">
     <div class="test-header" id="testHeader">
         <div class="header-logo-container">
             <img src="./img/logo.svg" alt="Логотип O! Test">
         </div>
         <div class="navigation-list" id="navigation">
             <a href="#pretesting" class="navigation-item">О!пределяй</a>
             <a href="#optimize" class="navigation-item">О!птимизируй</a>
             <a href="#retesting" class="navigation-item">О!тслеживай</a>
             <a href="https://shop.vilavi.com/" target="_blank" class="navigation-item">Купить</a>
             <div class="navigation-item__flag-box">
                 <img src="./img/RU.svg" alt="Выбор региона" class="navigation-flag" />
             </div>

         </div>
         <div class="burger" id="burger">
             <span></span>
             <span></span>
             <span></span>
         </div>
     </div>

     <div class="test-main">
         <div class="test-main-title-block">
             По разным данным, у 80 - 97% населения есть дефицит омега-3 кислот!
         </div>
         <div class="first-main-content-row">
             <div class="main-image-container">
                 <img src="./img/test-main-picture.jpg" alt="">
             </div>
             <div class="content-block">
                 <div class="content">
                     <div class="content-items-wrapper">
                         <p>О!пределяй</p>
                         <p>О!птимизируй</p>
                         <p>О!тслеживай</p>
                     </div>
                 </div>
             </div>
         </div>
         <!-- <div class="second-main-content-row">
            <div class="video-block" data-type="videoWrp">
                <iframe class="video-frame" id="mainVideo" src="https://www.youtube.com/embed/HBABteBYpMo" frameborder="0" style="max-width: 100%" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <video controls preload="metadata" class="video-frame" id="mainVideo" data-type="video">
                    <source src="/src/video/otest1.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
        <div class="third-main-content-row">
            <div class="content-block">
                <div class="content">
                    Жирные кислоты омега-3 важны для бесчисленных аспектов нашего здоровья, от нейронов до клеток сердца, от сетчатки глаз до капилляров, но многие из нас не знают, как определить, получаем ли мы их достаточно. Более того, большинство ничего не знают об Омега-3.
                </div>
            </div>
            <div class="content-block">
                <div class="content">
                    По разным данным, у <span class="main-color-text large-font-size">80 - 97%</span> населения есть дефицит омега-3 кислот!
                </div>
            </div>
        </div> -->
     </div>

     <div class="problems-list-block">
         <div class="problems-list-block-title">
             Вы даже не думали
         </div>
         <div class="problems-list-block-item">
             <p>
                 о том, что дефицит жирных кислот Омега-3 представляет собой серьезную проблему и может повлечь целый комплекс нарушений в работе нашего организма, как внутри его так и снаружи.
             </p>
         </div>
         <div class="problems-list-block-item">
             <div class="problems-list-items-wrapper">
                 <div class="problems-list-item">
                     <div class="check-icon">
                         <img src="./img/check.svg" alt="">
                     </div>
                     <div class="check-description">
                         проблема с сердцем
                     </div>
                 </div>
                 <div class="problems-list-item">
                     <div class="check-icon">
                         <img src="./img/check.svg" alt="">
                     </div>
                     <div class="check-description">
                         снижение иммунитета
                     </div>
                 </div>
                 <div class="problems-list-item">
                     <div class="check-icon">
                         <img src="./img/check.svg" alt="">
                     </div>
                     <div class="check-description">
                         ухудшение когнитивной функции
                     </div>
                 </div>
                 <div class="problems-list-item">
                     <div class="check-icon">
                         <img src="./img/check.svg" alt="">
                     </div>
                     <div class="check-description">
                         нарушением психического здоровья
                     </div>
                 </div>
                 <div class="problems-list-item">
                     <div class="check-icon">
                         <img src="./img/check.svg" alt="">
                     </div>
                     <div class="check-description">
                         проблемы с кожей, волосами и ногтями
                     </div>
                 </div>
                 <div class="problems-list-item">
                     <div class="check-icon">
                         <img src="./img/check.svg" alt="">
                     </div>
                     <div class="check-description">
                         проблемы со зрением
                     </div>
                 </div>
                 <div class="problems-list-item">
                     <div class="check-icon">
                         <img src="./img/check.svg" alt="">
                     </div>
                     <div class="check-description">
                         низкий уровень энергии
                     </div>
                 </div>
                 <div class="problems-list-item">
                     <div class="check-icon">
                         <img src="./img/check.svg" alt="">
                     </div>
                     <div class="check-description">
                         проблемы со сном
                     </div>
                 </div>
                 <div class="problems-list-item">
                     <div class="check-icon">
                         <img src="./img/check.svg" alt="">
                     </div>
                     <div class="check-description">
                         боль в суставах
                     </div>
                 </div>
             </div>
         </div>
         <div class="title-problems-list-block-item">
             Важно знать
         </div>
         <div class="problems-list-block-item">
             <p>
                 что когда твой индекс Омега-3 в норме - ты чувствуешь себя красивым, молодым, бодрым и здоровым
             </p>
         </div>
     </div>

     <div class="pretesting" id="pretesting">
         <div class="pretesting-title">
             <div class="pretesting-title-item title">
                 Ответьте на простые вопросы и узнайте, как Омега-3 влияет на состояние вашего организма
             </div>
             <!-- <div class="pretesting-title-item subtitle">
                Определяем признаки дефицита омега-3
            </div>
            <div class="pretesting-title-item test-title">
                <span>
                    Какие признаки у вас есть?
                </span>
                <span>
                    Отметьте все признаки, которые у вас есть.
                </span>
            </div> -->
         </div>

         <form class="pretesting-form" id="pretestingForm">

             <fieldset>
                 <legend>Пол</legend>

                 <div class="checkbox-wrp" data-type="checkbox-wrp">
                     <div class="input-label">
                         <input class="checkbox-input" type="radio" id="male" name="gender" value="male" required />
                         <label class="test-item-label" for="male">мужской</label>
                     </div>

                     <div class="input-label">
                         <input class="checkbox-input" type="radio" id="female" name="gender" value="female" />
                         <label class="test-item-label" for="female">женский</label>
                     </div>
                 </div>

                 <label for="age" class="programs-result-input-label">
                     <div style="width: max-content;">Возраст</div>
                     <div><input id="age" class="omega-index-input" type="number" name="age" min="1" max="100" step="1" required /> лет</div>
                 </label>
             </fieldset>

             <p style="padding-top: .5rem;">
                 Укажите все характеристики, которые у вас есть:
             </p>
             <div class="checkbox-wrp" data-type="checkbox-wrp">
                 <div class="input-label">
                     <input class="checkbox-input" type="checkbox" id="hormonalImbalances" name="hormonal-imbalances" value="hormonalImbalances" />
                     <label class="test-item-label" for="hormonalImbalances">Гормональные сбои</label>
                 </div>
             </div>

             <div class="checkbox-wrp" data-type="checkbox-wrp">
                 <div class="input-label">
                     <input class="checkbox-input" type="checkbox" id="weightProblems" name="weight-problems" value="weightProblems" />
                     <label class="test-item-label" for="weightProblems">Лишний или недостаточный вес</label>
                 </div>
             </div>

             <div class="checkbox-wrp" data-type="checkbox-wrp">
                 <div class="input-label">
                     <input class="checkbox-input" type="checkbox" id="jointPain" name="joint-pain" value="jointPain" />
                     <label class="test-item-label" for="jointPain">Боль в суставах и скованность по утрам</label>
                 </div>
             </div>

             <div class="checkbox-wrp" data-type="checkbox-wrp">
                 <div class="input-label">
                     <input class="checkbox-input" type="checkbox" id="nervousBreakdowns" name="nervous-breakdowns" value="nervousBreakdowns" />
                     <label class="test-item-label" for="nervousBreakdowns">Нервные срывы и депрессивное настроение</label>
                 </div>
             </div>

             <div class="checkbox-wrp" data-type="checkbox-wrp">
                 <div class="input-label">
                     <input class="checkbox-input" type="checkbox" id="sleepProblems" name="sleep-problems" value="sleepProblems" />
                     <label class="test-item-label" for="sleepProblems">Проблемы со сном, бессоница</label>
                 </div>
             </div>

             <div class="checkbox-wrp" data-type="checkbox-wrp">
                 <div class="input-label">
                     <input class="checkbox-input" type="checkbox" id="concentrationProblems" name="concentration-problems" value="concentrationProblems" />
                     <label class="test-item-label" for="concentrationProblems">Плохая концентрация и низкая внимательность</label>
                 </div>
             </div>

             <div class="checkbox-wrp" data-type="checkbox-wrp">
                 <div class="input-label">
                     <input class="checkbox-input" type="checkbox" id="chronicFatigue" name="chronic-fatigue" value="chronicFatigue" />
                     <label class="test-item-label" for="chronicFatigue">Хроническая усталость</label>
                 </div>
             </div>

             <div class="checkbox-wrp" data-type="checkbox-wrp">
                 <div class="input-label">
                     <input class="checkbox-input" type="checkbox" id="bloodPressureProblems" name="blood-pressure-problems" value="bloodPressureProblems" />
                     <label class="test-item-label" for="bloodPressureProblems">Проблемы с давлением</label>
                 </div>
             </div>

             <div class="checkbox-wrp" data-type="checkbox-wrp">
                 <div class="input-label">
                     <input class="checkbox-input" type="checkbox" id="heartAttack" name="heart-attack" value="heartAttack" />
                     <label class="test-item-label" for="heartAttack">Перенесенный инфаркт или инсульт или генетическая предрасположенность</label>
                 </div>
             </div>

             <div class="checkbox-wrp" data-type="checkbox-wrp">
                 <div class="input-label">
                     <input class="checkbox-input" type="checkbox" id="reproductiveProblems" name="reproductive-problems" value="reproductiveProblems" />
                     <label class="test-item-label" for="reproductiveProblems">Проблемы с репродуктивной функцией</label>
                 </div>
             </div>

             <div class="checkbox-wrp" data-type="checkbox-wrp">
                 <div class="input-label">
                     <input class="checkbox-input" type="checkbox" id="problematicHair" name="problematic-hair" value="problematicHair" />
                     <label class="test-item-label" for="problematicHair">Неудовлетворенность состоянием кожи, ногтей и волос</label>
                 </div>
             </div>

             <div class="pretesting-submit-wrp">
                 <button class="pretesting-submit-btn" type="submit">Узнать результаты</button>
             </div>
         </form>

         <div class="pretesting-title" style="margin-top: 2rem;">
             <div class="pretesting-title-item title">
                 Мы предлагаем удобное решение с точной оценкой омега-3 индекса - O! Test
             </div>
         </div>
     </div>

     <div class="product-box">
         <div class="prb-info">
             <div class="info-title">
                 <img src="./img/logo-box.svg" alt="" class="info-title-image">
             </div>
             <div class="info-description">
                 Простой и надежный инструмент, который позволяет оценить текущее состояние организма, увеличить ресурсы своего организма и почувствовать себя лучше с помощью персонализированной коррекции продуктами VILAVI.
             </div>
         </div>
         <div class="prb-image-wrp">
             <img src="./img/otest-box.png" alt="">
         </div>
     </div>

     <div class="video-block">
         <div class="video-block-title">
             Посмотри, это важно.
         </div>
         <div class="video-wrp" id="videoWrp">
             <iframe id="video1" src="https://www.youtube.com/embed/t0km3x--6_c?si=3yUjH83zUzABzz_0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
         </div>
     </div>

     <div class="advantages-block">
         <div class="advantages-block-title">
             Преимущества
         </div>
         <div class="advantages">
             <div class="advanages-item">
                 <div class="advantages-title">
                     Персонализировано
                 </div>
                 <div class="advantages-decription">
                     Вы получите персональные рекомендации по результатам теста, чтобы внести изменения в свой рацион и улучшить свое самочувствие
                 </div>
             </div>
             <div class="advanages-item">
                 <div class="advantages-title">
                     Экспертно
                 </div>
                 <div class="advantages-decription">
                     Технологии и научный подход — важные составляющие нашей работы.
                 </div>
             </div>
             <div class="advanages-item">
                 <div class="advantages-title">
                     Комфортно
                 </div>
                 <div class="advantages-decription">
                     Вы можете сделать тест в любое время в комфортной обстановке, не тратя нервы и время на посещение больницы.
                 </div>
             </div>
             <div class="advanages-item">
                 <div class="advantages-title">
                     Быстро
                 </div>
                 <div class="advantages-decription">
                     Мы заказываем для вас курьера, чтобы тест быстро отправлялся в лабораторию. Вы получите результат за 5 рабочих дней из лаборатории, постараемся быстрее.
                 </div>
             </div>
             <div class="advanages-item">
                 <div class="advantages-title">
                     Результативно
                 </div>
                 <div class="advantages-decription">
                     Вы сможете отслеживать результат “до-после” с помощью второго теста.
                 </div>
             </div>
         </div>
     </div>

 <?php if($region != "ru") { ?>
     <!--Блок для содружественников Start-->
     <div class="delivery-container delivery--disactive">
         <div class="delivery-title">
             Бесплатная доставка!
         </div>
         <div class="delivery-text">
             Закажите один или оба товара и получите<br>
             бесплатную доставку из России.
         </div>
     </div>

     <div class="stages-for-other-countries other-countries--disactive">
         <div class="stages-title">Этапы проведения O! Test</div>
         <div class="stages__container">
             <div class="stage__other-countries" data-type="card" data-side="front">
                 <div class="stage-icon__container">
                     <img src="./img/7.svg" alt="" class="stage-icon">
                 </div>
                 <div class="stage-country__info-block">
                     <div class="info-block-title">
                         1. Закажите тест.
                     </div>
                     <div class="info-block-text">
                         Обратная сторона блока: Оформите заказ из России на тест для определения уровня Омега-3. Чтобы получить бесплатную доставку, добавьте в корзину либо Сертификат О! TEST, либо 2 сертификата О! TEST и подарок. Бесплатная доставка распространяется только на эти позиции.
                     </div>
                 </div>
             </div>
             <div class="stage__other-countries" data-type="card" data-side="front">
                 <div class="stage-icon__container">
                     <img src="./img/1.svg" alt="" class="stage-icon">
                 </div>
                 <div class="stage-country__info-block">
                     <div class="info-block-title">
                         2. Сделайте анализ в комфортной обстановке.
                     </div>
                     <div class="info-block-text">
                         Обратная сторона блока: В наборе есть все необходимое для того, чтобы сделать тест. Анализ проводится с использованием специально подготовленной тест полоски, позволяющей хранить и транспортировать “сухую кровь” в лабораторию. Вы самостоятельно собираете кровь на тест полоску в удобное время.
                     </div>
                 </div>
             </div>
             <div class="stage__other-countries" data-type="card" data-side="front">
                 <div class="stage-icon__container">
                     <img src="./img/3.svg" alt="" class="stage-icon">
                 </div>
                 <div class="stage-country__info-block">
                     <div class="info-block-title">
                         3. Подготовьте тест для отправки.
                     </div>
                     <div class="info-block-text">
                         Обратная сторона блока:<br>Упакуйте его плотно и надежно.
                     </div>
                 </div>
             </div>
             <div class="stage__other-countries" data-type="card" data-side="front">
                 <div class="stage-icon__container">
                     <img src="./img/8.svg" alt="" class="stage-icon">
                 </div>
                 <div class="stage-country__info-block">
                     <div class="info-block-title">
                         5. Получите результат по Email.
                     </div>
                     <div class="info-block-text">
                         Обратная сторона блока:<br>Ожидайте результат на ваш Email.
                     </div>
                 </div>
             </div>
             <div class="stage__other-countries" data-type="card" data-side="front">
                 <div class="stage-icon__container">
                     <img src="./img/4.svg" alt="" class="stage-icon">
                 </div>
                 <div class="stage-country__info-block">
                     <div class="info-block-title">
                         6. Выберите протокол на основе полученного результата.
                     </div>
                     <div class="info-block-text">
                         Обратная сторона блока: Данные, полученные в ходе исследования, являются основным критерием для выбора оптимального протокола приема продуктов для коррекции Омега-3.
                     </div>
                 </div>
             </div>
             <div class="stage__other-countries" data-type="card" data-side="front">
                 <div class="stage-icon__container">
                     <img src="./img/5.svg" alt="" class="stage-icon">
                 </div>
                 <div class="stage-country__info-block">
                     <div class="info-block-title">
                         7. Корректируйте уровень Омега-3.
                     </div>
                     <div class="info-block-text">
                         Обратная сторона блока: Принимайте продукты, рекомендованные в протоколе коррекции.
                     </div>
                 </div>
             </div>
             <div class="stage__other-countries" data-type="card" data-side="front">
                 <div class="stage-icon__container">
                     <img src="./img/6.svg" alt="" class="stage-icon">
                 </div>
                 <div class="stage-country__info-block">
                     <div class="info-block-title">
                         8. Отслеживайте результаты в динамике.
                     </div>
                     <div class="info-block-text">
                         Повторяйте тесты для отслеживания динамики и достижения оптимального уровня Омега-3.
                     </div>
                 </div>
             </div>
         </div>
         <div class="video-instruction-wrp">
             <a href="https://www.youtube.com/watch?v=yB69tgtX53I" target="_blank" class="video-instruction-btn">Смотреть инструкцию</a>
         </div>
     </div>
     <!--Блок для содружественников End-->

 <?php } else { ?>

     <div class="select-test">
         <div class="test-card">
             <div class="card-img-wrp"><img src="./img/product1.jpg" alt=""></div>
             <div class="card-description">
                 <p>
                     <span>О!пределяйте</span> свой уровень омега-3 с помощью простого теста
                 </p>
                 <p>
                     <span>О!птимизируйте</span> ресурсное состояние организма с помощью советов нашего эксперта и эффективных продуктов от VILAVI
                 </p>
             </div>
             <a href="https://store.vilavi.com/Item/62366" class="buy-btn">Купить</a>
         </div>

         <div class="test-card">
             <div class="card-img-wrp"><img src="./img/product2.jpg" alt=""></div>
             <div class="card-description">
                 <p>
                     <span>О!пределяйте</span> свой уровень омега-3 с помощью простого теста
                 </p>
                 <p>
                     <span>О!птимизируйте</span> ресурсное состояние организма с помощью советов нашего эксперта и эффективных продуктов от VILAVI
                 </p>
                 <p>
                     <span>О!тслеживайте</span> свое состояние в динамике (в наборе второй тест для контроля результата “до-после”)
                 </p>
                 <p>
                     <span>О!мега-3</span> получайте в подарок и принимайте их сразу, чтобы поддерживать оптимальный уровень омега-3
                 </p>
             </div>
             <a href="https://shop.vilavi.com/Item/62396" class="buy-btn">Купить</a>
         </div>
     </div>

     <div class="stages stages--active">
         <div class="stages-title">Этапы проведения O! Test</div>
         <div class="stages-wrp">
             <div class="stage" data-type="card" data-side="front">
                 <div class="stage-icon-wrp">
                     <img src="./img/1.svg" alt="" class="stage-icon">
                 </div>
                 <div class="stage-title">
                     1. Сделаете анализ в комфортной обстановке
                 </div>
                 <div class="stage-description">
                     В наборе есть все необходимое для того, чтобы сделать тест. Анализ проводится с использованием специально подготовленной тест полоски, позволяющей хранить и транспортировать “сухую кровь” в лабораторию. Вы самостоятельно собираете кровь на тест полоску в удобное время.
                 </div>
             </div>
             <div class="stage" data-type="card" data-side="front">
                 <div class="stage-icon-wrp">
                     <img src="./img/2.svg" alt="" class="stage-icon">
                 </div>
                 <div class="stage-title">
                     2. Вызовем курьера в удобное время
                 </div>
                 <div class="stage-description">
                     Бесплатно вызываем вам курьера и далее анализ передается в лабораторию где производится исследование
                 </div>
             </div>
             <div class="stage" data-type="card" data-side="front">
                 <div class="stage-icon-wrp">
                     <img src="./img/3.svg" alt="" class="stage-icon">
                 </div>
                 <div class="stage-title">
                     3. Получаете быстрый результат на почту
                 </div>
                 <div class="stage-description">
                     В лаборатории проводится исследование и вы получаете результат анализа на электронную почту через неделю.
                 </div>
             </div>
             <div class="stage" data-type="card" data-side="front">
                 <div class="stage-icon-wrp">
                     <img src="./img/4.svg" alt="" class="stage-icon">
                 </div>
                 <div class="stage-title">
                     4. Получаете персональный протокол коррекции
                 </div>
                 <div class="stage-description">
                     Данные, полученные в ходе исследования, являются основным критерием для выбора оптимального протокола приема продуктов для коррекции Омега-3.
                 </div>
             </div>
             <div class="stage" data-type="card" data-side="front">
                 <div class="stage-icon-wrp">
                     <img src="./img/5.svg" alt="" class="stage-icon">
                 </div>
                 <div class="stage-title">
                     5. Проводите коррекцию омега-3
                 </div>
                 <div class="stage-description">
                     Принимаем продукты, рекомендованные в протоколе коррекции.
                 </div>
             </div>
             <div class="stage" data-type="card" data-side="front">
                 <div class="stage-icon-wrp">
                     <img src="./img/6.svg" alt="" class="stage-icon">
                 </div>
                 <div class="stage-title">
                     6. Отслеживаете результаты в динамике
                 </div>
                 <div class="stage-description">
                     Улучшение состояния здоровья — динамичный процесс. Через 2 месяца приема рекомендованных продуктов из Вашей персональной программы коррекции делаем контрольный анализ омега-3 и сравниваем результаты до и после.
                 </div>
             </div>
         </div>
         <div class="video-instruction-wrp">
             <a href="https://www.youtube.com/watch?v=yB69tgtX53I" target="_blank" class="video-instruction-btn">Смотреть инструкцию</a>
         </div>
     </div>

 <?php } ?>

     <!-- <div class="video-instruction">
        <div class="video-instruction-title">
            Видео-инструкция:
        </div>
        <div class="video-block" data-type="videoWrp">
            <iframe class="video-frame" id="mainVideo" src="https://www.youtube.com/embed/HBABteBYpMo" frameborder="0" style="max-width: 100%" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <video controls preload="metadata" class="video-frame" id="videoInstruction" data-type="video">
                <source src="/src/video/flowers.mp4" type="video/mp4" />
            </video>
        </div>
    </div> -->
     <!-- <div class="correction-programs" id="programs">
        <div class="programs-title-wrp">
            <div class="programs-title">Программы коррекции</div>
            <div class="programs-subtitle">Достижение желательного уровня омега-3 индекса возможно путем изменения рациона.</div>
        </div>
        <div class="programs-description-wrp">
            <div class="programs-description">Программы коррекции — синергия функциональных продуктов VILAVI и рекомендаций по улучшению образа жизни, составленных вместе с экспертами-врачами для улучшения ресурсного состояния организма.</div>
            <div class="programs-description" data-style="four-corners"><div class="main-color-text">Интересный факт:</div> По статистическим оценкам, повышение омега-3 индекса на 2% (от 6% до 8%) приводит к 15% снижению сердечно-сосудистых рисков.</div>
        </div>
        <div class="programs-result-wrp">
            <div class="programs-result-title">Получили результат омега-3 индекса?</div>
            <div class="programs-result-content">Введите свой результат и мы подберем программу коррекции</div>
            <div class="programs-result-input">
                <label for="omegaIndex" class="programs-result-input-label">
                    <div>Мой омега-3 индекс</div>
                    <div><input id="omegaIndex" class="omega-index-input" type="number" min="0" max="100" step="0.1"/> %</div>
                </label>
            </div>
            <button class="programs-result-btn" id="programsResultBtn">Подобрать протокол коррекции</button>
        </div>
    </div> -->

     <div class="after-test-block" id="optimize">
         <div class="after-test-block-title">
             Что получишь после теста?
         </div>
         <div class="after-test-item">
             <div class="after-test-item-title">
                 Отчет из лаборатории
             </div>
             <div class="after-test-item-description">
                 Отчет из лаборатории — результат O! Test, в котором вы найдете точные цифровые показатели, по которым можно оценить риск сердечно-сосудистых заболеваний, уровень провоспалительной готовности организма, сбалансированность питания и иммунный ответ организма.
             </div>
             <div class="download-example-wrp">
                 <a class="download-example" href="./img/otest-example.pdf" target="_blank">
                     <img src="./img/download-icon.svg" alt="" class="download-icon">
                     &nbsp;Скачать пример
                 </a>
             </div>
         </div>

         <div class="after-test-item">
             <div class="after-test-item-title">
                 Программа коррекции
             </div>
             <div class="after-test-item-description">
                 Программа коррекции — синергия функциональных продуктов VILAVI и рекомендаций по улучшению образа жизни, составленных вместе с экспертами для улучшения ресурсного состояния организма.
             </div>
         </div>

         <div class="programs-result-wrp">
             <!-- <div class="programs-result-title">Получили результат омега-3 индекса?</div> -->
             <div class="programs-result-content">Введите свой результат и мы подберем программу коррекции</div>
             <div class="programs-result-input">
                 <label for="omegaIndex" class="programs-result-input-label">
                     <div>Мой омега-3 индекс</div>
                     <div><input id="omegaIndex" class="omega-index-input" type="number" min="0" max="100" step="0.1" /> %</div>
                 </label>
             </div>
             <button class="programs-result-btn" id="programsResultBtn">Подобрать протокол коррекции</button>
         </div>
     </div>

     <div class="our-principle-block" id="retesting">
         <div class="our-principle-block-title">
             Наш принцип — "управлять можно тем, что можно измерить".
         </div>

         <div class="our-principle-block-content">
             <p>
                 Чтобы управлять своим самочувствием, повторите тестирование после программы коррекции.
             </p>
             <p>
                 Так вы сможете наблюдать за динамикой важнейших показателей здоровья и оценить положительное влияние продуктов VILAVI на эти показатели.
             </p>
         </div>

         <div id="rounded-corners-item" class="rounded-corners-item">
             Даже если вы чувствуете себя отлично и не замечаете каких-либо проблем со здоровьем, проводите чекап 2 раз в год, чтобы не пропустить риск ухудшения самочувствия !
         </div>
     </div>

     <div class="faq" id="faq">
         <div class="faq-title">Вопрос-ответ</div>
         <div class="faq-list">
             <div class="faq-list-item" data-type="faq-list-item" data-state="collapse">
                 <div class="faq-question" data-type="faq-question">
                     <div class="expand-icon"><span data-type="rotatable" class="line-item"></span><span class="line-item"></span></div>
                     <span>Для чего организму нужны омега-3 кислоты?</span>
                 </div>
                 <div class="faq-answer" data-type="answer">
                     <p>
                         Омега-3 оказывают разностороннее влияние на человеческий организм. Они важны для полноценной работы головного мозга, эффективной работы системы кровообращения, нервной системы, правильного обмена веществ. Омега-3, улучшают вязкость крови, поддерживают активность лейкоцитов, снижают концентрацию гомоцистеина, аминокислоты, накопление, которой приводит к тромбообразованию.
                     </p>
                     <p>
                         Омега-3 стимулируют иммунную систему, обладают противовоспалительными свойствами, укрепляют природный защитный барьер от бактерий и вирусов, улучшают проницаемость клеточных мембран для кислорода, что приводит к быстрой доставке кислорода к тканям и клеткам, активирует производство гормонов, принимающих участие во всех биохимических клеточных процессах. Формируют мужские половые клетки, мембранные оболочки нейронов головного мозга, а также сетчатки глаз, поддерживают подвижность суставов, купирует болевой синдром при артритах и артрозах.
                     </p>
                     <p>
                         Омега-3 замедляют процессы старения, снижают аппетит и подавляют чувство голода, улучшают внимание, память, участвуют в обменных процессах гормона радости, снижая эмоциональное напряжение. Помогают сохранить здоровье волос, кожи, ногтей, помогают при планировании беременности подготовить организм, а также способствуют правильному развитию плода во время беременности.
                     </p>
                 </div>
             </div>
             <div class="faq-list-item" data-type="faq-list-item" data-state="collapse">
                 <div class="faq-question" data-type="faq-question">
                     <div class="expand-icon"><span data-type="rotatable" class="line-item"></span><span class="line-item"></span></div>
                     <span>Что такое омега-3 индекс?</span>
                 </div>
                 <div class="faq-answer" data-type="answer">
                     <p>
                         Омега-3 индекс - суммарный процент эйкозапентаеновой (ЭПК ) и докозагексаеновой (ДГК) кислот от общего количества жирных кислот в мембране эритроцита. Омега-3 индекс отражает уровень содержания двух наиболее значимых омега-3 полиненасыщенных жирных кислот, является доступным для регуляции (с помощью коррекции питания) и позволяет оценить риск внезапной сердечной смерти, инфаркта миокарда и других сердечно-сосудистых и нейродегенеративных заболеваний.
                     </p>
                 </div>
             </div>
             <div class="faq-list-item" data-type="faq-list-item" data-state="collapse">
                 <div class="faq-question" data-type="faq-question">
                     <div class="expand-icon"><span data-type="rotatable" class="line-item"></span><span class="line-item"></span></div>
                     <span>Как сдать омега-3 индекс?</span>
                 </div>
                 <div class="faq-answer" data-type="answer">
                     <p>
                         Это очень просто. Анализ проводится с использованием специально подготовленной тест полоски. Вы самостоятельно собираете кровь на тест полоску в удобное для Вас время. Далее анализ передается курьером в лабораторию, где производится исследование и вам высылаются результаты анализа по электронной почте. Данные, полученные в ходе исследования, являются основным критерием для выбора оптимального протокола приема продуктов для коррекции Омега-3.
                     </p>
                 </div>
             </div>
             <div class="faq-list-item" data-type="faq-list-item" data-state="collapse">
                 <div class="faq-question" data-type="faq-question">
                     <div class="expand-icon"><span data-type="rotatable" class="line-item"></span><span class="line-item"></span></div>
                     <span>Что такое программы коррекции?</span>
                 </div>
                 <div class="faq-answer" data-type="answer">
                     <p>
                         Программы коррекции — синергия функциональных продуктов VILAVI и рекомендаций по улучшению образа жизни, составленных вместе с экспертами-врачами для улучшения ресурсного состояния организма.
                     </p>
                 </div>
             </div>
             <div class="faq-list-item" data-type="faq-list-item" data-state="collapse">
                 <div class="faq-question" data-type="faq-question">
                     <div class="expand-icon"><span data-type="rotatable" class="line-item"></span><span class="line-item"></span></div>
                     <span>Как подобрать программы коррекции?</span>
                 </div>
                 <div class="faq-answer" data-type="answer">
                     <p>
                         Данные, полученные в ходе исследования омега-3 индекса, являются основным критерием для выбора оптимального протокола приема продуктов для коррекции Омега-3.
                     </p>
                 </div>
             </div>
         </div>
     </div>

     <div class="footer">
         <div class="footer-content">
             <div class="footer-logo-wrp">
                 <img src="./img/vilavi-logo.svg" alt="" class="footer-logo">
             </div>
             <div class="contacts">
                 <div class="email">
                     <p>INFO@VILAVI.COM</p>
                     <p>(Служба поддержки)</p>
                 </div>
                 <div class="phone">
                     <p>8 800 700 6 888</p>
                     <p>(по России звонок бесплатный)</p>
                     <p>по будням с 05:00 до 16:00</p>
                     <p>в выходные с 07:00 до 16-00</p>
                     <p>по московскому времени</p>
                 </div>
             </div>
         </div>
         <div class="copyright">
             2017-2023 © VILAVI INT LTD. Все права защищены. Димостени Севери 12, 6-й этаж, офис 601, 1080, Никосия, Кипр
         </div>
     </div>

 </div>

        <div class="modal-section modal-section--active">
            <div class="modal-container --active">
                <div class="modal-close">&#10006;</div>
                <div class="modal-title">
                    Ваш регион <span>Россия?</span>
                </div>
                <div class="modal-buttons__container">
                    <div class="modal-button modal-button__true">Всё верно</div>
                    <div class="modal-button modal-button__change">Сменить регион</div>
                </div>
            </div>
            <div class="modal-change-container --disactive">
                <div class="modal-region">
                    <div class="modal-region-close">&#10006;</div>
                    <div class="modal-title region-title">
                        Выберите свой регион
                    </div>
                    <div class="modal-country__container">
                        <div data-country="ru" class="country-button country--active">Россия</div>
                        <div data-country="kz" class="country-button ">Казахстан</div>
                        <div data-country="kg" class="country-button ">Кыргызстан</div>
                    </div>
                </div>
            </div>
        </div>
        <script src="index_new.js?22"></script>
    </body>
</html>