---
title: "CSS overflow-wrap | 글자가 화면 밖으로 탈출"
date: "2024-12-19"
---

스프링 부트 서버, 아페에서 개발 중.

이미지를 업로드하면 비율에 맞춰서 390x390 pixel로 변경하는 코드가 있는데,

iOS에서 올린 사진만 90도 회전되어서 업로드되는 것을 확인했다.
안드로이드에서 찍은 사진을 업로드했을 때는 정상적으로 업로드 되는 것이었다.

한동안 검색해보던 와중에 EXIF 메타데이터라는게 존재한다는 것을 알았고,

직접 확인해보기 위해서 다음과 같은 코드를 썼다.

```java
@Service
class ImageService {
	fun getImageMetadata(file: MultipartFile){
		val imageStream = file.inputStream
		val metadata = ImageMetadataReader.readMetadata(imageStream)

		metadata.directories.map {
			it.tags.map {
				println(it)
			}
		}
	}
}
```

실제로 확인해보니까 EXIF로 시작하는 많은 메타데이터가 있었다.

```
[Exif IFD0] Make - Apple
[Exif IFD0] Model - iPhone 14 Pro
[Exif IFD0] Orientation - Right side, top (Rotate 90 CW)
...
```

여기서 회전에 관련된 것은 Orientation이고, 해당 값에 따라 회전할 각도가 정해진다. 자바에선 해당 메타데이터를 받아서 값에 따라 회전시켜주는 코드를 추가했다.

```java
private BufferedImage rotateImage(BufferedImage image, int orientation) {
        return switch (orientation) {
            case 3 -> rotate(image, 180);
            case 6 -> rotate(image, 90);
            case 8 -> rotate(image, -90);
            default -> image;
        };
    }
```

하지만 이미지 수정 관련 로직이 너무 많아졌고, 메모리 초과 에러가 발생하였다.

java.lang.OutOfMemoryError: Java heap space
