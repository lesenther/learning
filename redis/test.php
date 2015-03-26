<?php

require 'vendor/autoload.php';

$redis = new Predis\Client([
  'scheme' => 'tcp',
  'host' => '127.0.0.1',
  'port' => '6379'
]);

$range = range(1, 5000);

$list = 'users';

$redis->flushall();

if(!$redis->exists($list)){
  //create
  foreach($range as $key => $value){
    $fake_data = [
      'name' => 'Bob',
      'age' => 29
    ];

    echo "Setting value! $key | ";
    $redis->lpush($list, json_encode($fake_data));
  }
}

$data = $redis->lrange($list, 0, -1);


foreach($data as $key => $value){
  $stuff = json_decode($value);
  echo $key . ' : ';
  echo $stuff->name . ', ';
  echo $stuff->age;
  echo "\n";
}
//print_r($data);