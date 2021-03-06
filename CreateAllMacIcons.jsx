
/***********************************************************************

iPhone App Icon Export for iPhone 4/3 Touch and iPad.

Creates all 6 icons sizes that are required for these devices from homescreen, retina display, spotlight search       

1. To use this script, double click the script file, photoshop will launch and ask you for a 512x512 icon file of any image format (jpeg, psd, gif, png etc.)
2. Select the file and photos shop will create 6 icon files and save these with the correct names in the save folder as the 512 image.

3. Add these images into your iPhone project and update you app plist.
Read Apples Q&Q 1686 on how to add this icons to your info plist
http://developer.apple.com/iphone/library/qa/qa2010/qa1686.html

Hope you like this script, hit John Ballinger up on Twitter @sponno on from his website www.bluespark.co.nz

Please keep this Attribution here if you are going to redistrubte this code. Thanks
Creative Commons Attribution 3.0 New Zealand License
http://creativecommons.org/licenses/by/3.0/nz/     

************************************************************************/

//set unit preferences
var strtRulerUnits = app.preferences.rulerUnits;
var strtTypeUnits = app.preferences.typeUnits;
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;


/////////////////////////////////////////////////////////////////////////////////////////////

//create a new slideshow package
function doResizeAndOutput()
{                              
	
	   	// Select Icon file
		var file = File.openDialog("Select your iPhone icon file, this should be 512 by 512 for best results, your new icon files will be saved here as well.", /\.(jpe|jpg|jpeg|gif|png|tif|tiff|bmp|psd)/i);
	    if(file == null) return; // cancelled. 
        app.open(file);  
		var path =  file.absoluteURI.substr(0,file.absoluteURI.lastIndexOf("/")+1);
	     
		
	    // Check document resolution
		if(activeDocument.resolution!=72){
			activeDocument.resizeImage(null,activeDocument.height,72,ResampleMethod.BICUBIC);
		}    
		
		// Png Save Options                                          
		var pngOptions = new PNGSaveOptions();
		pngOptions.interlaced = false;
		
		activeDocument.resizeImage(null,512,512,ResampleMethod.BICUBIC);  
	   	activeDocument.saveAs(File(path + "/icon512.png"), pngOptions, true);                     
        
		// undo document resize.   
		// This way we get the best scaling to smaller sizes.
		var baseState = app.activeDocument.historyStates.length - 2;
		app.activeDocument.activeHistoryState = app.activeDocument.historyStates[baseState];
		
	 	activeDocument.resizeImage(null,256,256,ResampleMethod.BICUBIC);  
		activeDocument.saveAs(File(path + "/icon256.png"), pngOptions, true);
        
		// undo document resize.
		var baseState = app.activeDocument.historyStates.length - 2;
		app.activeDocument.activeHistoryState = app.activeDocument.historyStates[baseState];

		
	 	activeDocument.resizeImage(null,128,128,ResampleMethod.BICUBIC);  
		activeDocument.saveAs(File(path + "/icon128.png"), pngOptions, true);

		// undo document resize.
		var baseState = app.activeDocument.historyStates.length - 2;
		app.activeDocument.activeHistoryState = app.activeDocument.historyStates[baseState];
		
	 	activeDocument.resizeImage(null,32,32,ResampleMethod.BICUBIC);  
		activeDocument.saveAs(File(path + "/icon32.png"), pngOptions, true);
        
		// undo document resize.
		var baseState = app.activeDocument.historyStates.length - 2;
		app.activeDocument.activeHistoryState = app.activeDocument.historyStates[baseState];
		
	 	activeDocument.resizeImage(null,16,16,ResampleMethod.BICUBIC);  
		activeDocument.saveAs(File(path + "/icon16.png"), pngOptions, true);
		
		 // Close file
		activeDocument.close(SaveOptions.DONOTSAVECHANGES);
		
        alert("Done\nAll the new icons have been saved beside your original icons.")

}
//create the slideshow source files
doResizeAndOutput();
