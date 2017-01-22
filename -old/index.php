<?
header('Content-Type: application/json');

$tsv = file_get_contents('https://docs.google.com/spreadsheets/d/1ECowHw9wDaUt0AevWPutQnk3enmoB551st7VjXxzsl8/pub?gid=0&single=true&output=tsv');

// echo $tsv;

$lines = explode("\n",$tsv);
$head = array_shift($lines);
$head = explode("\t",$head);

// print_r($lines);

// echo "<table>";
// foreach($lines as $line){
// 	$cols = explode("\t",$line);
// 	echo "<tr>";
// 	foreach($cols as $col){
// 		echo "<td>$col</td>";
// 	}
// 	echo "</tr>";
// }
// echo "</table>";

$out = array();
foreach($lines as $i=>$line){
	$cols = explode("\t",$line);
	foreach($cols as $j=>$col){
		$out[$i][$head[$j]] = $col;
	}
}
echo json_encode($out);

?>