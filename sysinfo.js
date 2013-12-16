// Plugin sysinfo

var exec = require('child_process').exec;
var fs = require("fs");
// ------------------------------------------
//  CRON
// ------------------------------------------
exports.cron = function(callback, task , SARAH ){
  if (!task.dossier){
    console.log("cron :sysinfo Pas de dossier");
    return;
  }
   if (!task.disk){
    console.log("cron :sysinfo Pas de disque");
    return;
  }
  // ===============================================================================================
  var urlfile = task.disk+":\\"+task.dossier+"\\plugins\\sysinfo\\";   
  // ===============================================================================================
  // LECTURE DU FICHIER ATTENDRE 1 MINUTE AVANT DE LANCER LA DETECTION
 setTimeout(function(){
    // LECTURE CPU
   	var resulat = readfile(urlfile+'cpus.txt');
	if (resulat > task.cpumaxi ){
			SARAH.speak("Surcharge CPU a "+resulat);
			}
	// LECTURE MEMOIRE
		var resulat = readfile(urlfile+'mem.txt');
	if (resulat > task.memmaxi ){
			SARAH.speak("Mémoire limit a "+resulat);
			}
	  //  
},3000);
	// =========================================================================	
	var mac_adres  = urlfile+"cpu.vbs";
    var child = exec(mac_adres, function (error, stdout, stderr) {
			if (error !== null) {
			   		console.log('cpu:' +error);
					}
			}); 
	// =========================================================================	
	var mac_adres  = urlfile+"memoire.vbs";
    var child = exec(mac_adres, function (error, stdout, stderr) {
			if (error !== null) {
			   		console.log('cpu:' +error);
					}
			}); 		
// -------------------------------------------
// FIN CRON
// -------------------------------------------
   console.log('cpu: info');
   }

exports.action = function(data, callback, config, SARAH){
  // config module
  config = config.modules.sysinfo;
 // ==================================================================================================================== 		
 var urlfile = config.disk+":\\"+config.dossier+"\\plugins\\sysinfo\\"; 
  
  switch(data.key)
  		{
		case "MEM":
		// Mémoire utilisé
		var retour_etat = readfile(urlfile+"mem.txt");
				SARAH.speak(" le poucentage et de "+retour_etat);
				
		break;
		
		case "FREE":
		// Mémoire utilisé
		var retour_etat = readfile(urlfile+"diskl.txt");
				SARAH.speak(" Escpace disponible et de "+retour_etat);
				
		break;
		
		case "DD":
		// Mémoire utilisé
		var retour_etat = readfile(urlfile+"diskt.txt");
				SARAH.speak(" Escpace Total du disque et de "+retour_etat);
				
		break;
		
		case "CPU":
		// Mémoire utilisé
		var retour_etat = readfile(urlfile+"cpus.txt");
				SARAH.speak(" La charge CPU et de "+retour_etat);
				
		break;
		
		case "TCPU":
		// Mémoire utilisé
		var retour_etat = readfile(urlfile+"cput.txt");
		console.log('cpu:' +retour_etat+'<');
				if (!retour_etat){
				             SARAH.speak(" La Température CPU et de "+retour_etat);
									} else {
									        SARAH.speak("Désolé cette information n'est pas disponible ");
											}
		break;
		
		case "SRV":
		// Mémoire utilisé
		var retour_etat = readfile(urlfile+"servicenb.txt");
				SARAH.speak("Il y a "+retour_etat+" programme et service démarrer");
		break;
		
		}
callback({});
}
 //**********************************************************************************************************************

//  ============================= subroutine lecture fichier
var readfile = function(fileread){
		var fs = require('fs');
		var resulat_read = fs.readFileSync(fileread, 'UTF-8', function(err, content) {
				if (err) {
						console.log('err lecture fichier:'+fileread);
						return "ERREUR";
						} 
				
		});
return resulat_read
}