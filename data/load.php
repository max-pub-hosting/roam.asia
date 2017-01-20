<?
echo "loading TimeTable ...\n";
$times = json_decode(file_get_contents('http://api.max.pub/google/sheet/?doc=1ECowHw9wDaUt0AevWPutQnk3enmoB551st7VjXxzsl8&colNames&colNamesCC'),1);

echo "loading Ports ...\n";
$ports = json_decode(file_get_contents('http://api.max.pub/google/sheet/?doc=1ECowHw9wDaUt0AevWPutQnk3enmoB551st7VjXxzsl8&gid=575777383&colNames&rowNames&colNamesCC'),1);

echo "loading Operators ...\n";
$operators = json_decode(file_get_contents('http://api.max.pub/google/sheet/?doc=1ECowHw9wDaUt0AevWPutQnk3enmoB551st7VjXxzsl8&gid=666296596&colNames&rowNames&colNamesCC'),1);






echo "processing TimeTable ...\n";
foreach($times as $k=>$v){
	unset($v['from']);
	unset($v['to']);
	$v['operator'] = $operators[$v['operator']]['name'];
	$v['times'] = array_map("trim", explode(',',$v['times']));
	$timeSave[$times[$k]['from']][$times[$k]['to']][] = $v;
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