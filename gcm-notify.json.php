<?php

header("Content-type: application/json; charset=utf-8");

$res = array(
    'title' => 'Дальномер Bosch PLR 15 лазерный',
    'body' => 'Лазерный дальномер Bosch PLR 15 0.603.672.021 измерение расстояний от 0,15 до 15 м',
    'icon' => 'http://www.sdealer.ru/_mod_files/ce_images/eshop/bosch-plr15.jpg',
    'url' => 'http://www.sdealer.ru/katalog/instrument/bosch/dalnomer-bosch-plr-15?', // ? at the end!!!!
);

echo json_encode($res);