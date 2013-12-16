// Plugin sysinfo

var exec = require('child_process').exec;
var fs = require("fs");
var urlfile = __dirname+'\\';
// ------------------------------------------
//  CRON
// ------------------------------------------
exports.cron = function(callback, task , SARAH ){
  if (!task.cpumaxi){
    console.log("cron :sysinfo Pas de limite CPU");
    return;
  }
   if (!task.memmaxi){
    console.log("cron :sysinfo Pas de limite Mémoire");
    return;
  }
  // ===============================================================================================
  // LECTURE DU FICHIER ATTENDRE 1 MINUTE AVANT DE LANCER LA DETECTION
 var fichier_lect
 setTimeout(function(){
    // LECTURE CPU
   	 fichier_lect = readfile(urlfile+'cpus.txt');
	if (fichier_lect > task.cpumaxi ){
			SARAH.speak("Surcharge CPU a "+resulat);
			}
	// LECTURE MEMOIRE
	 fichier_lect = readfile(urlfile+'mem.txt');
	if (fichier_lect > task.memmaxi ){
			SARAH.speak("Mémoire limit a "+resulat);
			}
	  //  
},3000);
	// =========================================================================	
	 fichier_lect  = urlfile+"cpu.vbs";
    var child = exec(fichier_lect, function (error, stdout, stderr) {
			if (error !== null) {
			   		console.log('cpu:' +error);
					}
			}); 
	// =========================================================================	
	fichier_lect  = urlfile+"memoire.vbs";
    var child = exec(fichier_lect, function (error, stdout, stderr) {
			if (error !== null) {
			   		console.log('cpu:' +error);
					}
			}); 
	// =========================================================================	
	fichier_lect  = urlfile+"disk.vbs";
    var child = exec(fichier_lect, function (error, stdout, stderr) {
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
 var retour_file
  switch(data.key)
  		{
		case "MEM":
		// Mémoire utilisé
		retour_file = readfile(urlfile+"mem.txt");
				SARAH.speak(" le poucentage et de "+retour_file+' de mémoire utilisé.' );
				
		break;
		
		case "FREE":
		// Mémoire utilisé
		retour_file = readfile(urlfile+"diskl.txt");
				SARAH.speak(" Escpace Total disponible sur les disque dur et de "+retour_file+".");
				
		break;
		
		case "DD":
		// Mémoire utilisé
		retour_file = readfile(urlfile+"diskt.txt");
				SARAH.speak(" Escpace Total des disques dur et de "+retour_file+".");
				
		break;
		
		case "CPU":
		// Mémoire utilisé
		retour_file = readfile(urlfile+"cpus.txt");
				SARAH.speak(" La charge CPU et de "+retour_file+".");
				
		break;
		
		case "TCPU":
		// Mémoire utilisé
		retour_file = readfile(urlfile+"cput.txt");
		console.log('cpu:' +retour_etat+'<');
				if (!retour_file){
				             SARAH.speak(" La Température CPU et de "+retour_file);
									} else {
									        SARAH.speak("Désolé cette information n'est pas disponible sur ma machine");
											}
		break;
		
		case "SRV":
		// Mémoire utilisé
		retour_file = readfile(urlfile+"servicenb.txt");
				SARAH.speak("Il y a "+retour_file+", programme et service démarrer");
		break;
		
		case "NOM":
		// nom du cpu
		retour_file = readfile(urlfile+"cpun.txt");
				SARAH.speak("le nom de mon CPU et "+retour_file+".");
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
