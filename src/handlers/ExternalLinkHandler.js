function ExternalLinkHandler(type = "url", link) {
    switch (type) {
        case "email":

            break;
        case "phone":

            break;
        default: {
            const opened = window.open(link, "_blank", "noopener,noreferrer");
            if (opened)
                opened.focus()
        }
            break;
    }
}

export default ExternalLinkHandler