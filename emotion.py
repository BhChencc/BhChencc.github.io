import cv2
from deepface import DeepFace

def analyze_emotion(image_path):
    # 读取图像
    img = cv2.imread(image_path)
    
    # 使用DeepFace进行情感分析
    try:
        result = DeepFace.analyze(img, actions=['emotion'])
        
        # 获取主要情感
        dominant_emotion = result[0]['dominant_emotion']
        
        # 获取所有情感的概率
        emotions = result[0]['emotion']
        
        # 在图像上显示主要情感
        #cv2.putText(img, f"Emotion: {dominant_emotion}", (10, 30),
                    #cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
        
        # 显示图像
        #cv2.imshow("Emotion Analysis", img)
        #cv2.waitKey(0)
        #cv2.destroyAllWindows()
        
        # 打印详细的情感分析结果
        print("Emotion Analysis Results:")
        for emotion, score in emotions.items():
            print(f"{emotion}: {score:.2f}%")
        
        print(dominant_emotion)
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")

# 使用函数
image_path = "/Users/baihuichen/Desktop/img/2.jpg"  # 请替换为您的图片路径
analyze_emotion(image_path)