//==================================================================================================
// Plugin  :sysinfo
// Fichier : sysinfo.js
// Auteur  :Ferreira Agostinho
// Version :1.02 base
// Version :1.03 fichier .json
// Version :1.031 Rajout des dossiers Bin & Data & imaage
//==================================================================================================
var exec = require('child_process').exec;
var fs = require("fs");
var urlfile = __dirname+'\\';
// ------------------------------------------
// PLUGIN SYSINFO CRON
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
	  fichier_lect = readfile(urlfile+"\Data\\cpu.json");
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
	  fichier_lect = readfile(urlfile+"\Data\\mem.json");
		var info_mem = JSON.parse(fichier_lect);
				if (info_mem.Memoire.RamUtilisePourcent >= task.memmaxi ){
						SARAH.speak("Mémoire limit "+info_mem.Memoire.RamUtilisePourcent);
				}		
	 // fin lecture JSON
	
},3000);
	// =============================================================
	// Lancement des fichier .vbs
	var fichier_run  =urlfile+"\Bin\\cpu.vbs";
	var child = exec(fichier_run, function (error, stdout, stderr) {
			if (error !== null) {
			   		console.log('run cpu:' +error);
					} else {
							console.log('run cpu.vbs : [Ok] ');
						   }			
			}); 
	 //============================================================	
	fichier_run  = urlfile+"\Bin\\memoire.vbs";
	var child = exec(fichier_run, function (error, stdout, stderr) {
			if (error !== null) {
			   		console.log('run memoire :' +error);
					} else {
							console.log('run memoire.vbs : [Ok] ');
						   }			
			}); 		
	//==============================================================		
	fichier_run  = urlfile+"\Bin\\disk.vbs";
	var child = exec(fichier_run, function (error, stdout, stderr) {
			if (error !== null) {
			   		console.log('run disk :' +error);
					} else {
							console.log('run disk.vbs : [Ok] ');
						   }			
			}); 
    
// -------------------------------------------
// FIN CRON
// -------------------------------------------
   console.log('sysinfo: Run');
// -------------------------------------------   
}
// ------------------------------------------
//  PLUGIN SYSINFO MODULES
// ------------------------------------------	
//********************************************************************************************************************** 	
exports.action = function(data, callback, config, SARAH){
  // config module
  config = config.modules.sysinfo;
 // ============================== 
 var message ="Pas Ordre.";
 // ===== JSON CPU 
 var retour_file = readfile(urlfile+"\Data\\cpu.json");
 var info_cpu = JSON.parse(retour_file);
 // ===== JSON DISK
 retour_file = readfile(urlfile+"\Data\\disk.json");
    var info_disk = JSON.parse(retour_file);
 // ===== JSON MEMOIRE
 retour_file = readfile(urlfile+"\Data\\mem.json");
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
		 message=" la barette 1 a "+info_mem.Memoire.DIMM1+" Mega.";
				
		break;
		
		case "MENRAM2":
		// capacité de la  barette mémoire
		 message=" la barette 2 a "+info_mem.Memoire.DIMM2+" Mega.";
				
		break;
		
		case "MENRAM3":
		// capacité de la  barette mémoire
		 message=" la barette 3 a "+info_mem.Memoire.DIMM3+" Mega.";
				
		break;
		
		case "MENRAM4":
		// capacité de la  barette mémoire
		 message=" la barette 4 a "+info_mem.Memoire.DIMM4+" Mega.";
					
		break;
		
		case "MENRAM5":
		// capacité de la  barette mémoire
		 message=" la barette 5 a "+info_mem.Memoire.DIMM5+" Mega.";
				
		break;
		
		case "MENRAM6":
		// capacité de la  barette mémoire
		 message=" la barette 6 a "+info_mem.Memoire.DIMM6+" Mega.";
				
		break;
		
		case "MENRAM7":
		// capacité de la  barette mémoire
		 message=" la barette 7 a "+info_mem.Memoire.DIMM7+" Mega.";
				
		break;
		
		case "MENRAM8":
		// capacité de la  barette mémoire
		 message=" la barette 8 a "+info_mem.Memoire.DIMM8+" Mega.";
				
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
//  ============================= subroutine lecture fichier asynchro
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
