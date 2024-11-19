// could link this script instead of copy pasting inside <script> tag for each html file

// Using jQuery to load the navigation bar from navigation.html
  $.get("navigation_bar.html", function(data) {
    $("#nav-placeholder").replaceWith(data);
});

$.get("footer.html", function(data) {
    $("#footer-placeholder").replaceWith(data);
});