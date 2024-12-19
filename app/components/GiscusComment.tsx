import Giscus from '@giscus/react'

export default function GiscusComment(){
    return (
        <div className='my-16'>
            <Giscus
                category='Announcements'
                categoryId='DIC_kwDONGYlKs4CjueV'
                repo='enbraining/Bricn'
                repoId='R_kgDONGYlKg'
                mapping='pathname'
                strict='0'
                reactionsEnabled='1'
                emitMetadata='0'
                inputPosition='bottom'
                theme='light'
                lang='ko'
            />
        </div>
    )
}
