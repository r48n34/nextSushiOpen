function copyToClipboard(str:string){
    try{
        navigator.clipboard.writeText(str);
    }
    catch(e){
        return;
    }
}

export { copyToClipboard }