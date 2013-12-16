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
	var fichier_lect  = urlfile+"cpu.vbs";
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
 var urlfile = config.disk+":\\"+config.dossier+"\\plugins\\sysinfo\\"; 
  
  switch(data.key)
  		{
		case "MEM":
		// Mémoire utilisé
		var retour_file = readfile(urlfile+"mem.txt");
				SARAH.speak(" le poucentage et de "+retour_file);
				
		break;
		
		case "FREE":
		// Mémoire utilisé
		var retour_file = readfile(urlfile+"diskl.txt");
				SARAH.speak(" Escpace disponible et de "+retour_file);
				
		break;
		
		case "DD":
		// Mémoire utilisé
		var retour_file = readfile(urlfile+"diskt.txt");
				SARAH.speak(" Escpace Total du disque et de "+retour_file);
				
		break;
		
		case "CPU":
		// Mémoire utilisé
		var retour_file = readfile(urlfile+"cpus.txt");
				SARAH.speak(" La charge CPU et de "+retour_file);
				
		break;
		
		case "TCPU":
		// Mémoire utilisé
		var retour_file = readfile(urlfile+"cput.txt");
		console.log('cpu:' +retour_etat+'<');
				if (!retour_file){
				             SARAH.speak(" La Température CPU et de "+retour_file);
									} else {
									        SARAH.speak("Désolé cette information n'est pas disponible ");
											}
		break;
		
		case "SRV":
		// Mémoire utilisé
		var retour_file = readfile(urlfile+"servicenb.txt");
				SARAH.speak("Il y a "+retour_file+" programme et service démarrer");
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
