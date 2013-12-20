//==================================================================================================
// Plugin  :sysinfo
// Fichier : sysinfo.js
// Auteur  :Ferreira Agostinho
// Version :1.02 base
// Version :1.03 fichier .json
//==================================================================================================
var exec = require('child_process').exec;
var fs = require("fs");
var urlfile = __dirname+'\\';
// ------------------------------------------
// PLUGIN CRON
// ------------------------------------------
//**********************************************************************************************************************
exports.cron = function(callback, task , SARAH ){
  if (!task.cpumaxi){
    console.log("cron :sysinfo Pas de limite CPU");
    return;
  }
   if (!task.memmaxi){
    console.log("cron :sysinfo Pas de limite Mémoire");
    return;
  }
  // ==============================================================
  // LECTURE DU FICHIER ATTENDRE 3 SECONDES AVANT DE LANCER 
  setTimeout(function(){
    var fichier_lect
	// LECTURE CPU 
	  fichier_lect = readfile(urlfile+"cpu.json");
		var info_cpu = JSON.parse(fichier_lect);
		// lecture charge CPU
	var lecture_cpu = info_cpu.cpu.LoadPercentage	
				if ( lecture_cpu > task.cpumaxi ) {
												SARAH.speak(" Surcharge de mon CPU  ");
												}
		// lecture etat ventilo
				 if (info_cpu.cpu.Ventilateur !== "OK") {
				                                SARAH.speak(" j'ai un ventilateur en dérangement. ");
												}
				
	// LECTURE MEMOIRE
	  fichier_lect = readfile(urlfile+"mem.json");
		var info_mem = JSON.parse(fichier_lect);
				if (info_mem.Memoire.RamUtilisePourcent >= task.memmaxi ){
						SARAH.speak("Mémoire limit "+info_mem.Memoire.RamUtilisePourcent);
				}		
	 // fin lecture JSON
	
},3000);
	// =============================================================
	// Lancement des fichier .vbs
	var fichier_run  =urlfile+"\cpu.vbs";
	var child = exec(fichier_run, function (error, stdout, stderr) {
			if (error !== null) {
			   		console.log('run cpu:' +error);
					} else {
							console.log('run cpu : [Ok] ');
						   }			
			}); 
	 //============================================================	
	fichier_run  = urlfile+"\memoire.vbs";
	var child = exec(fichier_run, function (error, stdout, stderr) {
			if (error !== null) {
			   		console.log('run memoire :' +error);
					} else {
							console.log('run memoire : [Ok] ');
						   }			
			}); 		
	//==============================================================		
	fichier_run  = urlfile+"\disk.vbs";
	var child = exec(fichier_run, function (error, stdout, stderr) {
			if (error !== null) {
			   		console.log('run disk :' +error);
					} else {
							console.log('run disk : [Ok] ');
						   }			
			}); 
    
// -------------------------------------------
// FIN CRON
// -------------------------------------------
console.log(fichier_run);
   console.log('sysinfo: Go');
    }
// ------------------------------------------
//  PLUGIN MODULES
// ------------------------------------------	
//********************************************************************************************************************** 	
exports.action = function(data, callback, config, SARAH){
  // config module
  config = config.modules.sysinfo;
 // ============================== 
 var message ="Pas Ordre";
 // ===== JSON CPU 
 var retour_file = readfile(urlfile+"cpu.json");
 var info_cpu = JSON.parse(retour_file);
 // ===== JSON DISK
 retour_file = readfile(urlfile+"disk.json");
    var info_disk = JSON.parse(retour_file);
 // ===== JSON MEMOIRE
 retour_file = readfile(urlfile+"mem.json");
      var info_mem = JSON.parse(retour_file);
 // ===== FIN JSON 	
  switch(data.key)
  		{
		case "HELLO":
		// Dire Hello pour verification et débug
		 message =" Hello Toi.";
				
		break;
		case "MENRAM1":
		// capacité de la  barette mémoire
		 message=" la premier barette de ram et de "+info_mem.Memoire.DIMM1+".";
				
		break;
		
		case "MENRAM2":
		// capacité de la  barette mémoire
		 message=" la deuxiéme barette de ram et de "+info_mem.Memoire.DIMM2+".";
				
		break;
		
		case "MENRAMT":
		// Nombre de barette mémoire
		message=" J'ai "+info_mem.Memoire.NbBarrette+" barette de mémoire.";
				
		break;
		
		case "MONIP":
		// Adresse IP
				message="Mon adresse IP et le "+info_cpu.cpu.AddressIP+" ." ;
				
		break;
		
		case "MEM":
		// Mémoire utilisé
		 message=" le pourcentage et de ma mémoire utilisé et de "+info_mem.Memoire.RamUtilisePourcent+" poursant soi "+info_mem.Memoire.RamUtilise+".";
				
		break;
		
		case "FREEC":
		// Escpace dispo disk C
		 message=" Escpace Total disponible sur le disque dur C et de "+info_disk.disk.TotalFreeC+".";
				
		break;
		
		case "DDC":
		// Capacité disk C
		 message=" Escpace Total du disques dur C et de "+info_disk.disk.TotalSizeC+".";
				
		break;
		
		case "CPU":
		// Charge CPU
		message=" Ma charge CPU et de "+info_cpu.cpu.LoadPercentage+". poursant";
				
		break;
		
		case "TCPU":
		// Température CPU
				if (!info_cpu.cpu.Temp_CPU){
				             message=" La Température CPU et de "+info_cpu.cpu.Temp_CPU;
									} else {
									         message=" Désolé cette information n'est pas disponible sur ma machine";
											}
		break;
		
		case "SRV":
		// Nombre de service et programme
		message="J'ai "+info_mem.Memoire.ServiceStart+", programme et service démarrer";
		break;
		
		case "NOM":
		// Nom du cpu
		message="le nom de mon CPU et "+info_cpu.cpu.Name+".";
		break;
		
		}
		// fin on fais parle Sarah
callback({'tts': message });
}
//  **********************************************************************************************************************
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
