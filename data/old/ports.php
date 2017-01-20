<?
error_reporting(E_ERROR);
$times = json_decode(file_get_contents('boat.times.json'),1);
$ports = json_decode(file_get_contents('boat.ports.json'),1);

foreach($times as $from=>$L1){
	$P1 = $ports[$from];
	$path = "PH/".$P1['region'].'/'.$P1['city'];
	echo $path."\n";
	mkdir($path, 0777, true);
	foreach($L1 as $to=>$L2){ 
		$P2 = $ports[$to];
		fclose(STDOUT);
		$STDOUT = fopen($path.'/port.html', 'wb');		
		?>
			<table class='item-list'>
				<tr>
					<td class='img' rowspan='2'>
						<img src='https://maps.googleapis.com/maps/api/staticmap
							?key=AIzaSyDtx24rTJ_yVIdMFUZrUNO33FOKnbXjovA
							&size=200x120
							&maptype=terrain
							&markers=color:blue|label:A|<?=$P1['lat']?>,<?=$P1['lon']?>
							&markers=color:green|label:B|<?=$P2['lat']?>,<?=$P2['lon']?>
							&path=color:0xff0000ff|weight:5|<?=$P1['lat']?>,<?=$P1['lon']?>|<?=$P2['lat']?>,<?=$P2['lon']?>
							&style=feature:poi|visibility:off'/>
					</td>
					<td class='title'>
						&odot; <?=$P1['city']?>
					</td>
					<td class='title'>
						&rarr; <?=$P2['city']?>
					</td>
				</tr>
				<tr>
					<td colspan='2'>
						<? foreach($L2 as $time){ ?> 

						<? } ?>
					</td>
				</tr>
			</table>

	<? }
}

?>

