function ExternalLinkHandler(type="url", link) {
    switch (type) {
        case "email":

            break;
        case "phone":

            break;
        default:
            window.open(link, "_blank", "noopener,noreferrer");
            break;
    }
}

export default ExternalLinkHandler