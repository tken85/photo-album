var templates = {

  albumTmpl : ["<article rel='<%=name%>' class='photo-album'>", "<img src='<%=photos[0].url%>'>", "<h3><%=name%></h3>", "</article>"].join(""),

  navTmpl: "<a href='' rel='<%=name%>'><%=name%></a>",
};

//not currently using this page
