def extract_color(user_query, colors=None):
    """
    Return the first detected color (from the provided list) found in user_query.
    """
    if colors is None:
        colors = ["black", "grey", "white", "red", "blue", "green", "yellow", "pink", "purple", "orange", "brown"]
    query_lower = user_query.lower()
    for color in colors:
        if color in query_lower:
            return color
    return None
