import TweenMax, {Linear} from 'gsap'

const RenderTools = {
	makeProgressTween: (current_progress, total_time, onUpdate) => {
        const remaining_sec  = ((1 - current_progress) * total_time) / 1000
        const progress_dummy = {progress: current_progress}

        return TweenMax.to(progress_dummy, remaining_sec, {
            progress       : 1,
            ease           : Linear.easeNone,
            onUpdate,
            onUpdateParams : [progress_dummy]
        })
	}
}
export default RenderTools
