function createDiv(id, className, parentId)
{
    let div = document.createElement('div');
    div.className = className;
    div.id = id;
    document.getElementById(parentId).appendChild(div);
}
function createButton(id, className, textContent, parentId)
{
    let button = document.createElement('button');
    button.className = className;
    if (textContent != '')
    {
        button.innerText = textContent;
    }
    else 
    {
        button.innerText = 'Click me!';
    }
    button.id = id;
    document.getElementById(parentId).appendChild(button);
}
function createSpan(id, className, innerHTML, parentId)
{
    let span = document.createElement('span');
    span.className = className;
    span.innerHTML = innerHTML;
    span.id = id;
    document.getElementById(parentId).appendChild(span);
}
function createInput(id, className, type, placeholder, parentId)
{
    let input = document.createElement('input');
    input.id = id;
    input.className = className;
    if (type != 'default' && type != '')
    {
        input.type = type;
    }
    if (placeholder != '')
    {
        input.placeholder = placeholder;
    }
    document.getElementById(parentId).appendChild(input);
}
function clearAll()
{
    document.getElementById('showPlaylists').textContent = 'Show Playlists';
    clearSearchResults();
    clearSelector();
    clearPlaylistCreationBlank();
    hidePlaylists();
}
function getCookie(name) 
{
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(name, value, options = {}) 
{

    options = {
      path: '/',
      // при необходимости добавьте другие значения по умолчанию
      ...options
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
}