import { on_load as skills_load } from "../redux/skillsSlice"
import { on_load as education_load } from "../redux/educationSlice"
import { on_load as certificate_load } from "../redux/certificateSlice"
import { on_load as portfolio_load } from "../redux/portfolioSlice"
import { on_load as experience_load } from "../redux/experienceSlice"

function FetchData(endpoint) {
    return async function (dispatch) {
        try {
            const response = await fetch(`/api/${endpoint}`)
            if (!response.ok)
                throw new Error("Failed to fetch data");
            const results = await response.json()
            console.log(results)

            switch (endpoint) {
                case "skills":
                    dispatch(skills_load(results))
                    break;
                case "education":
                    dispatch(education_load(results))
                    break;
                case "certificates":
                    dispatch(certificate_load(results))
                    break;
                case "portfolios":
                    dispatch(portfolio_load(results))
                    break;
                case "experience":
                    dispatch(experience_load(results))
                    break;
                default:
                    break;
            }
        } catch (err) {
            console.error(err)
        }
    }
}

export default FetchData