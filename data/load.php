<?
echo "loading TimeTable ...\n";
$times = json_decode(file_get_contents('http://api.max.pub/google/sheet/?doc=1ECowHw9wDaUt0AevWPutQnk3enmoB551st7VjXxzsl8&gid=1047213582&colNames&colNamesCC'),1);

echo "loading Ports ...\n";
$ports = json_decode(file_get_contents('http://api.max.pub/google/sheet/?doc=1ECowHw9wDaUt0AevWPutQnk3enmoB551st7VjXxzsl8&gid=575777383&colNames&rowNames&colNamesCC'),1);

echo "loading Operators ...\n";
$operators = json_decode(file_get_contents('http://api.max.pub/google/sheet/?doc=1ECowHw9wDaUt0AevWPutQnk3enmoB551st7VjXxzsl8&gid=666296596&colNames&rowNames&colNamesCC'),1);





	// $v['opCode'] = $v['operator'];
	// $v['operator'] = $operators[$v['operator']]['name'];

			// $timeSave[$times[$k]['from']][$times[$k]['to']]['DAYS'][] = strtoupper($tmp[1]);
			// array_unique($timeSave[$times[$k]['from']][$times[$k]['to']]['DAYS']);

			// $timeSave[$times[$k]['from']][$times[$k]['to']]['DAYS'] = explode(',',"MON,TUE,WED,THU,FRI,SAT,SUN");

	// if(!$v['warnings']) unset($v['warnings']);


echo "processing TimeTable ...\n";
foreach($times as $k=>$v){
	unset($v['from']);
	unset($v['to']);
	$v['times'] = array_map("trim", explode(',',$v['times']));
	foreach($v['times'] as $v2){
		$tmp = explode('|',$v2);
		if(count($tmp)>1) {
			$v['weekly'][strtoupper($tmp[1])][] = $tmp[0];
		}
		else {
			$v['daily'][] = $tmp[0];
		}
	}
	unset($v['times']);
	$tmp = explode(',',$v['price']);
	if(count($tmp)>1){
		$v['price'] = array();
		foreach($tmp as $v2){
			$tmp2 = explode('|',$v2);
			$v['price'][$tmp2[1]] = $tmp2[0];
		}
	}
	$op = $v['operator'];
	unset($v['operator']);
	$timeSave[$times[$k]['from']][$times[$k]['to']][$op] = $v;
}
file_put_contents('sea/times.json', json_encode($timeSave));




echo "processing Ports ...\n";
foreach($ports as $k=>$v){
	$v['destinations'] = array();
	foreach($timeSave[$k] as $k2=>$v2){
		$v['destinations'][] = $k2;
	}
	unset($v['phoneNumber']);
	unset($v['email']);
	$portSave[$k] = $v;
}
file_put_contents('sea/ports.json', json_encode($portSave));

echo "processing Operators ...\n";
foreach($operators as $k=>$v){
	$opSave[$k] = $v['name'];
}
file_put_contents('sea/operators.json', json_encode($opSave));

$BOAT = array('ports'=>$portSave, 'times'=>$timeSave, 'operators'=>$opSave);
file_put_contents('sea/BOAT.js', 'BOAT='.json_encode($BOAT));


// echo "done\n\n";

// echo "processing Ports ...\n";
// $out = array();
// foreach($ports as $k=>$v){
// 	$t['code'] = $k;
// 	$out[$t['region']][$t['city']] = $t;
// }
// file_put_contents('sea/ports.json', json_encode($out));


// file_put_contents('sea/ports.flat.json', json_encode($tmp));

// file_put_contents('sea/operators.json', json_encode($tmp));

// echo "done\n\n";


// foreach($times as $k=>$v){
// 	$tt = explode(',',$v['times']);
// 	$tmp[$k]['times'] = array();
// 	foreach($tt as $t)
// 		$tmp[$k]['times'][] = trim($t);
// }
// file_put_contents('sea/times.flat.json', json_encode($tmp));

// $out = array();
// foreach($tmp as $t)
// 	$out[$t['from'].'-'.$t['to']][] = $t;
// file_put_contents('sea/times.dict.json', json_encode($out));

// echo "done\n\n";


?>